import { FC } from "react";
import { useProduct } from "./product-card";
import Image from "next/image";

interface IProductImage {
  onClick?: () => void;
}

export const ProductImage: FC<IProductImage> = ({ onClick }) => {
  const { image } = useProduct();
  if (!image?.url) return <div> </div>;
  return (
    <Image
      onClick={onClick}
      src={image?.url}
      alt="Terrarium"
      className="block h-64 w-full object-cover"
      width={288}
      height={320}
    />
  );
};
