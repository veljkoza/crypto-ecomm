import Image from "next/image";
import FileInput from "~/_shared/components/FileInput";
import { ProductDTO } from "~/_domain/products/types";
import { FC, useState } from "react";
import { api } from "~/utils/api";

interface IProductImagesForm {
  product: ProductDTO;
}

export const ProductImagesForm: FC<IProductImagesForm> = ({ product }) => {
  const setProductImageMutation = api.product.setProductImage.useMutation();
  const [imageBase64, setImageBase64] = useState<string>("");
  const { product: productApiCache } = api.useContext();
  const getImage = () => {
    if (imageBase64) return imageBase64;
    return product.image;
  };

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
  return (
    <div>
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
    </div>
  );
};
