import { createTRPCRouter } from "../trpc";

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

export const ordersRouter = createTRPCRouter({});
