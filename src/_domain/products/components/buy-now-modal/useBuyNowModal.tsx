import { useState } from "react";
import { TProductPrice } from "~/server/api/products/products.types";
import { ProductDTO } from "../../types";

export type TBuyNowFn = (params: { product: ProductDTO }) => void;

export const useBuyNowModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState<ProductDTO>();
  const openModal = () => setIsOpen(true);
  function closeModal() {
    setIsOpen(false);
  }

  const buyNow: TBuyNowFn = ({ product }) => {
    openModal();
    setProduct(product);
  };

  const price = product?.price as TProductPrice;

  return { isOpen, product, price, openModal, closeModal, buyNow };
};
