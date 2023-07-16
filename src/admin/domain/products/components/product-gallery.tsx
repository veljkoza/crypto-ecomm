import { FC, ReactNode } from "react";
import Image from "next/image";

interface IProductGallery {
  images: {
    alt: string;
    src: string;
    id?: string;
  }[];
  renderImage?: (image: { alt: string; src: string; id?: string }) => ReactNode;
  renderStart?: ReactNode;
}
const btnClasses = "overflow-hidden rounded-lg flex-shrink-0";
const imgClasses =
  "h-20 w-20 min-w-[80px] flex-shrink-0 object-cover shadow-lg";

interface IProductGalleryImage {
  image: { src: string; alt: string };
}
export const ProductGalleryImage: FC<IProductGalleryImage> = ({ image }) => {
  return (
    <button className={btnClasses} key={image.alt}>
      <Image
        alt={image.alt}
        src={image.src}
        height={64}
        width={64}
        className={imgClasses}
      />
    </button>
  );
};

export const ProductGallery = ({
  images,
  renderImage,
  renderStart,
}: IProductGallery) => {
  const getImg = (image: (typeof images)[0]) => {
    if (!renderImage) return <ProductGallery.Image image={image} />;
    return renderImage(image);
  };
  return (
    <div className="flex gap-4 overflow-x-auto pl-4 pr-4">
      {renderStart}
      {images.map(getImg)}
    </div>
  );
};

ProductGallery.Image = ProductGalleryImage;
