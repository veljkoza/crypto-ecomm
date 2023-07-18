import { ProductDTO } from "~/_domain/products/types";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { ZodTypeAny, z } from "zod";
import {
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
  ProductStatus,
} from "@prisma/client";
import { TProductPrice, productDto } from "../products/products.types";
import { orderDto } from "./orders.types";

/**
 * /orders/create
 * --------------------------
 * body:
 * {
 *   products: {product: Product, quantity: number}[],
 *   payment: 'ON_DELIVERY' | 'CRYPTO'
 * }
 *
 * 1. order.create(), status = PENDING, paymentStatus = NOT_PAID
 * 2. for product in products, orderProduct.create()
 * 3. connect OrderProducts to Order
 * 4. if payment = CRYPTO CryptoCheckout.pay(order.total)
 *    return {...res, paymentUrl}
 *    webhook: order/update({status, paymentStatus})
 * 5. if payment = ON_DELIVERY
 *    return {...res}
 */

const createOrderZodSchema = z.object({
  products: z.array(
    z.object({
      product: z.object({
        id: z.string(),
        price: z.object({
          currency: z.string(),
          value: z.number(),
        }),
        quantity: z.number(),
      }),
    })
  ),
  paymentMethod: z.nativeEnum(PaymentMethod),
  address: z.string(),
  fullName: z.string(),
  phoneNumber: z.string(),
});

export const ordersRouter = createTRPCRouter({
  create: publicProcedure
    .input(createOrderZodSchema)
    .mutation(async ({ ctx, input }) => {
      const totalPrice = input.products.reduce((total, { product }) => {
        return total + product.price.value * product.quantity;
      }, 0);
      console.log("hazbula1", { totalPrice });

      const order = await ctx.prisma.order.create({
        data: {
          status: OrderStatus.PENDING,
          total: totalPrice,
          fullName: input.fullName,
          address: input.address,
          phoneNumber: input.phoneNumber,
          paymentStatus: PaymentStatus.NOT_PAID,
          paymentMethod: input.paymentMethod,
          products: {},
        },
        select: orderDto,
      });

      console.log("hazbula");

      // create orderProducts
      const orderProductOperations = input.products.map((item) =>
        ctx.prisma.orderProduct.create({
          data: {
            product: {
              connect: { id: item.product.id },
            },
            quantity: item.product.quantity,
            Order: {
              connect: { id: order.id },
            },
          },
          select: {
            id: true,
            product: { select: productDto },
            quantity: true,
          },
        })
      );

      const orderProducts = await ctx.prisma.$transaction(
        orderProductOperations
      );
      order.products = orderProducts;

      return order;
    }),
});
