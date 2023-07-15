import { ProductDTO } from "../types";

export const mapGalleryToImages = (product: ProductDTO) => {
  return product.gallery.map((image) => ({
    src: image.asset.url,
    alt: `${image.asset.url} ${image.order}`,
  }));
};
