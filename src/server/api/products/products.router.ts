import { createTRPCRouter, publicProcedure } from "../trpc";

export const productsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const products = await ctx.prisma.product.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        attributes: true,
        image: true,
        price: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return products;
  }),
});
