import Image from "next/image";
import FileInput from "~/_shared/components/FileInput";
import { ProductDTO } from "~/_domain/products/types";
import { FC, useState } from "react";
import { api } from "~/utils/api";
import { ProductGallery } from "./product-gallery";
import { mapGalleryToImages } from "~/_domain/products/utils/mapGalleryToImages";
import { RxTrash } from "react-icons/rx";
import { Button } from "~/_shared/components/Button";
import { MdUpload, MdUploadFile } from "react-icons/md";

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

  const deleteGalleryImageMutation =
    api.product.deleteImageFromProductGallery.useMutation();

  const handleDeleteGalleryImage = (imageId: string) => {
    deleteGalleryImageMutation.mutate(
      {
        imageId: imageId,
      },
      {
        onSuccess: (res) => {
          if (!res.id || !res.productId) return;
          productApiCache.getById.setData({ id: res.productId }, (prev) => {
            if (!prev) return prev;
            const gallery = [...prev.gallery];
            const index = gallery.findIndex((img) => res.id === img.id);
            gallery.splice(index, 1);
            prev.gallery = gallery;
            return prev;
          });
        },
      }
    );
  };

  return (
    <div>
      <h1 className="mb-4 text-white">Main image:</h1>
      {productImage && (
        <Image
          alt={`product `}
          src={productImage}
          height={224}
          width={224}
          className="h-auto w-full rounded-lg object-cover"
        />
      )}
      <FileInput
        accept=".jpg, .png, .jpeg "
        render={({ onClick }) => (
          <Button onClick={() => onClick()} className="mt-4">
            Change image
          </Button>
        )}
        onFileChange={handleFileChange}
      />

      <h2 className="mb-4 mt-10 text-white">Gallery</h2>
      <ProductGallery
        images={mapGalleryToImages(product).reverse()}
        renderStart={
          <FileInput
            render={({ onClick }) =>
              addImageToProductGalleryMutation.isLoading ? (
                <p>Loading...</p>
              ) : (
                <button
                  onClick={() => onClick()}
                  className="flex h-20 min-w-[5rem] items-center justify-center rounded-lg bg-black-slate-300 text-2xl text-primary-600 "
                >
                  <MdUpload />
                </button>
              )
            }
            accept=".jpg, .png, .jpeg "
            onFileChange={handleGalleryFileUpload}
          />
        }
        renderImage={(image) => (
          <div className="relative flex flex-col items-center gap-2">
            <ProductGallery.Image image={image} />
            {deleteGalleryImageMutation.isLoading ? (
              <p>Loading...</p>
            ) : (
              <button
                className="flex h-10 w-10 items-center justify-center rounded-full bg-black-slate-300 bg-opacity-50 shadow-md"
                onClick={() => {
                  if (!image.id) return;
                  handleDeleteGalleryImage(image.id);
                }}
              >
                <RxTrash className="text-red-500" />
              </button>
            )}
          </div>
        )}
      />
    </div>
  );
};
