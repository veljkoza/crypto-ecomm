import Image from "next/image";
import { title } from "process";
import { FC, PropsWithChildren, ReactNode } from "react";
import { Button } from "~/shared/components/Button";
const IMG =
  "https://instagram.ftgd1-1.fna.fbcdn.net/v/t51.2885-15/352431925_775318890726418_4253163740566604307_n.jpg?stp=dst-jpg_e35_s1080x1080&_nc_ht=instagram.ftgd1-1.fna.fbcdn.net&_nc_cat=110&_nc_ohc=batTqXjRHk0AX9M3zn8&edm=AP_V10EBAAAA&ccb=7-5&ig_cache_key=MzExOTQ4NzQwMjk0MTM5ODM4Ng%3D%3D.2-ccb7-5&oh=00_AfDKethy2zxnAd7W7dSbF_z7S9Gr9HzRTRxb26EYBx6R6w&oe=64A77399&_nc_sid=2999b8";

const ProductImage = () => (
  <Image
    src={IMG}
    alt="Terrarium"
    className="block h-64 w-full object-cover"
    width={288}
    height={320}
  />
);

const ProductPrice = () => (
  <div className="font-mono">
    <p className="text-sm text-neutral-500">Price:</p>
    <p className="font-mono  text-white">0.004 ETH </p>
  </div>
);

const ProductTitle = () => (
  <div>
    <h1 className="font-work text-2xl font-semibold capitalize text-white">
      Oazica
    </h1>
  </div>
);

const ProductDescription = () => (
  <p className="line-clamp-3 text-sm text-neutral-400">
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi laudantium
    repellendus aperiam obcaecati, reprehenderit ipsam fugiat similique iste
    quam distinctio dolorem mollitia dolores inventore corrupti aspernatur.
    Quibusdam voluptatibus doloremque repellat.
  </p>
);

interface IProductCard {
  image?: ReactNode;
  actions?: ReactNode;
  //   price?: ReactNode;
  body?: ReactNode;
}

type TCompoundProps = {
  Image: typeof ProductImage;
  Price: typeof ProductPrice;
  Description: typeof ProductDescription;
  Title: typeof ProductTitle;
};

export const ProductCard: FC<IProductCard> & TCompoundProps = ({
  image,
  actions,
  body,
}) => {
  return (
    <article className="flex  flex-col overflow-hidden rounded-lg bg-black-slate-300 shadow-lg">
      {image}
      <div className="flex flex-1 flex-col gap-5 p-5">
        {body}
        <div className="flex justify-between">{actions}</div>
      </div>
    </article>
  );
};

ProductCard.Image = ProductImage;
ProductCard.Description = ProductDescription;
ProductCard.Price = ProductPrice;
ProductCard.Title = ProductTitle;
