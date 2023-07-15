import { Product } from "@prisma/client";
import { RouterOutputs } from "~/utils/api";

export type TProductPrice = { currency: string; value: number };
export const productDto: Record<keyof Product, boolean> = {
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
