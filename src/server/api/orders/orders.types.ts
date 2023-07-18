import { productDto } from "../products/products.types";

export const orderDto = {
  address: true,
  fullName: true,
  paymentMethod: true,
  paymentStatus: true,
  phoneNumber: true,
  id: true,
  products: {
    select: {
      id: true,
      product: { select: productDto },
      quantity: true,
    },
  },
  status: true,
  total: true,
};
