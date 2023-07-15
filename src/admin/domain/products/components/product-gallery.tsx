import { FC } from "react";
import Image from "next/image";

interface IProductGallery {
  images: {
    alt: string;
    src: string;
  }[];
}
const btnClasses = "overflow-hidden rounded-lg flex-shrink-0";
const imgClasses =
  "h-20 w-20 min-w-[80px] flex-shrink-0 object-cover shadow-lg";

export const ProductGallery: FC<IProductGallery> = ({ images }) => {
  return (
    <div className="flex gap-4 overflow-x-auto pl-4 pr-4">
      {images.map((image) => (
        <button className={btnClasses} key={image.alt}>
          <Image
            alt={image.alt}
            src={image.src}
            height={64}
            width={64}
            className={imgClasses}
          />
        </button>
      ))}
    </div>
  );
};
