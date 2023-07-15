import { type FC, type ReactNode, createContext, useContext } from "react";
import type { TProductPrice } from "~/server/api/products/products.types";
import type { RouterOutputs } from "~/utils/api";
import { ProductImage } from "./product-card-image";
import { formatPrice } from "~/_shared/utils";
import { ProductDTO } from "../../types";

const ProductPrice = () => {
  const { price: _price } = useProduct();
  const price = _price as TProductPrice;
  return (
    <div className="font-mono">
      <p className="text-sm text-neutral-500">Price:</p>
      <p className="font-mono  text-white">
        {formatPrice(price.value, price.currency)}
      </p>
    </div>
  );
};

const ProductTitle = () => {
  const { title } = useProduct();
  return (
    <div>
      <h1 className="font-work text-2xl font-semibold capitalize text-white">
        {title}
      </h1>
    </div>
  );
};

const ProductDescription = () => {
  const { description } = useProduct();
  return <p className="line-clamp-3 text-sm text-neutral-400">{description}</p>;
};

interface IProductCard {
  image?: ReactNode;
  actions?: ReactNode;
  //   price?: ReactNode;
  body?: ReactNode;
  product: TProduct;
  id?: string;
  className?: string;
}

type TCompoundProps = {
  Image: typeof ProductImage;
  Price: typeof ProductPrice;
  Description: typeof ProductDescription;
  Title: typeof ProductTitle;
};

type TProduct = ProductDTO;

const ProductContext = createContext({} as TProduct);
export const useProduct = () => {
  const product = useContext(ProductContext);
  if (!product) {
    throw new Error(
      "ProductCard.* components can only be used inside of ProductCard.tsx"
    );
  }
  return product;
};

export const ProductCard: FC<IProductCard> & TCompoundProps = ({
  image,
  actions,
  body,
  product,
  id,
  className = "",
}) => {
  return (
    <ProductContext.Provider value={product}>
      <article
        id={id}
        className={`flex  flex-col overflow-hidden rounded-lg bg-black-slate-300 shadow-lg ${className}`}
      >
        {image}
        <div className="flex flex-1 flex-col gap-5 p-5">
          {body}
          <div className="flex justify-between">{actions}</div>
        </div>
      </article>
    </ProductContext.Provider>
  );
};

ProductCard.Image = ProductImage;
ProductCard.Description = ProductDescription;
ProductCard.Price = ProductPrice;
ProductCard.Title = ProductTitle;
