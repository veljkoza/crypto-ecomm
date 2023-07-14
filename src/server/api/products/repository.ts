import { prisma } from "~/server/db";
import { productDto } from "./products.types";
import { TRPCError } from "@trpc/server";
import { TUpdateProductDTO } from "./router";

export const productsRepository = {
  getById: async (id: string) => {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
      select: productDto,
    });
    if (!product)
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `That product doesn't exist`,
      });
    return product;
  },
  updateProduct: async (input: TUpdateProductDTO) => {
    const product = await productsRepository.getById(input.id);
    const updatedProduct = await prisma.product.update({
      where: {
        id: input.id,
      },
      data: {
        ...product,
        ...input,
      },
    });
    return updatedProduct;
  },
};
