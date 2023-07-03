import Image from "next/image";
import { title } from "process";
import { type FC, type ReactNode, createContext, useContext } from "react";
import { TProductPrice } from "~/server/api/products/products.types";
import { Button } from "~/shared/components/Button";
import { RouterOutputs } from "~/utils/api";
const IMG =
  "https://instagram.ftgd1-1.fna.fbcdn.net/v/t51.2885-15/352431925_775318890726418_4253163740566604307_n.jpg?stp=dst-jpg_e35_s1080x1080&_nc_ht=instagram.ftgd1-1.fna.fbcdn.net&_nc_cat=110&_nc_ohc=batTqXjRHk0AX9M3zn8&edm=AP_V10EBAAAA&ccb=7-5&ig_cache_key=MzExOTQ4NzQwMjk0MTM5ODM4Ng%3D%3D.2-ccb7-5&oh=00_AfDKethy2zxnAd7W7dSbF_z7S9Gr9HzRTRxb26EYBx6R6w&oe=64A77399&_nc_sid=2999b8";

const ProductImage = () => {
  const { image } = useProduct();
  return (
    <Image
      src={image}
      alt="Terrarium"
      className="block h-64 w-full object-cover"
      width={288}
      height={320}
    />
  );
};

const ProductPrice = () => {
  const { price: _price } = useProduct();
  const price = _price as TProductPrice;
  return (
    <div className="font-mono">
      <p className="text-sm text-neutral-500">Price:</p>
      <p className="font-mono  text-white">
        {price.value.toFixed(2)} {price.currency}{" "}
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
}

type TCompoundProps = {
  Image: typeof ProductImage;
  Price: typeof ProductPrice;
  Description: typeof ProductDescription;
  Title: typeof ProductTitle;
};

type TProduct = RouterOutputs["product"]["getAll"][0];

const ProductContext = createContext({} as TProduct);
const useProduct = () => {
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
}) => {
  return (
    <ProductContext.Provider value={product}>
      <article className="flex  flex-col overflow-hidden rounded-lg bg-black-slate-300 shadow-lg">
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
