import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { Product } from "@prisma/client";

const productDto: Record<keyof Product, boolean> = {
  id: true,
  title: true,
  description: true,
  attributes: true,
  image: true,
  price: true,
  status: true,
  createdAt: true,
  updatedAt: true,
};

export const productsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const products = await ctx.prisma.product.findMany({
      select: productDto,
    });
    return products;
  }),
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const products = await ctx.prisma.product.findUnique({
        where: {
          id: input.id,
        },
        select: productDto,
      });
      return products;
    }),
});
