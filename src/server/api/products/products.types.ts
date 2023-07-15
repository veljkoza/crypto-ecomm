import { Product } from "@prisma/client";
import { RouterOutputs } from "~/utils/api";

export type TProductPrice = { currency: string; value: number };
export const productDto = {
  attributes: true,
  description: true,
  status: true,
  createdAt: true,
  id: true,
  image: true,
  price: true,
  title: true,
  gallery: {
    select: {
      asset: true,
      id: true,
      order: true,
    },
  },
};
