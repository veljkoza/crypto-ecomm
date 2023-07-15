import Image from "next/image";
import FileInput from "~/_shared/components/FileInput";
import { ProductDTO } from "~/_domain/products/types";
import { FC, useState } from "react";
import { api } from "~/utils/api";
import { ProductGallery } from "./product-gallery";
import { mapGalleryToImages } from "~/_domain/products/utils/mapGalleryToImages";

interface IProductImagesForm {
  product: ProductDTO;
}

export const ProductImagesForm: FC<IProductImagesForm> = ({ product }) => {
  const setProductImageMutation = api.product.setProductImage.useMutation();
  const addImageToProductGalleryMutation =
    api.product.addImageToProductGallery.useMutation();

  const [imageBase64, setImageBase64] = useState<string>("");
  const [imageBase64gallery, setImageBase64gallery] = useState<string>("");

  const { product: productApiCache } = api.useContext();
  const getImage = () => {
    if (imageBase64) return imageBase64;
    return product.image?.url;
  };
  console.log({ product });
  const productImage = getImage();
  const handleFileChange = ({ base64 }: { base64: string }) => {
    setImageBase64(base64);
    setProductImageMutation.mutate(
      {
        base64,
        id: product.id,
      },
      {
        onSuccess: (res) => {
          if (!res) return;
          productApiCache.getById.setData({ id: res.id }, res);
        },
      }
    );
  };

  const handleGalleryFileUpload = ({ base64 }: { base64: string }) => {
    const lastItem = product.gallery[product.gallery.length - 1];
    setImageBase64gallery(base64);
    addImageToProductGalleryMutation.mutate(
      {
        base64,
        order: lastItem ? lastItem.order : 0,
        id: product.id,
      },
      {
        onSuccess: (res) => {
          if (!res) return;
          productApiCache.getById.setData({ id: res.id }, res);
        },
      }
    );
  };

  return (
    <div>
      <h1 className="mb-4 text-white">Upload main image</h1>
      {productImage && (
        <Image
          alt={`product `}
          src={productImage}
          height={224}
          width={224}
          className="h-44 w-44 rounded-lg object-cover"
        />
      )}
      <FileInput accept=".jpg, .png, .jpeg " onFileChange={handleFileChange} />

      <h2 className="mb-4 text-white">Upload gallery image</h2>
      <ProductGallery images={mapGalleryToImages(product)} />
      <FileInput
        accept=".jpg, .png, .jpeg "
        onFileChange={handleGalleryFileUpload}
      />
    </div>
  );
};
