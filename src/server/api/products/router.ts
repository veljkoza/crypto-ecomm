import { ZodTypeAny, z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { Product } from "@prisma/client";
import { productDto } from "./products.types";
import { productsRepository } from "./repository";
import { TRPCError } from "@trpc/server";
import { ImgBBService } from "../services/imgbb.service";

export const productZodSchema = {
  title: z.string(),
  description: z.string(),
  price: z.object({ value: z.number(), currency: z.string() }),
  attributes: z.array(z.object({ name: z.string(), value: z.any() })),
};

const createProductZodSchema = z.object(productZodSchema);

const createProduct = publicProcedure
  .input(createProductZodSchema)
  .mutation(async ({ ctx, input }) => {
    const newProduct = await ctx.prisma.product.create({
      data: {
        title: input.title,
        description: input.description,
        price: input.price,
        status: "PUBLISHED",
        attributes: input.attributes,
        image: "",
      },
    });
    return newProduct;
  });

const updateProductZodSchema = z.object({
  ...productZodSchema,
  id: z.string(),
});
export type TUpdateProductDTO = z.infer<typeof updateProductZodSchema>;

const updateProduct = publicProcedure
  .input(updateProductZodSchema)
  .mutation(async ({ ctx, input }) => {
    const product = await productsRepository.updateProduct(input);
    return product;
  });

export const productsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const products = await ctx.prisma.product.findMany({
      select: productDto,
    });
    return products;
  }),
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const product = await productsRepository.getById(input.id);
      return product;
    }),
  create: createProduct,
  update: updateProduct,
  setProductImage: publicProcedure
    .input(z.object({ base64: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const res = await ImgBBService.upload({ base64: input.base64 });
      return res;
    }),
});
