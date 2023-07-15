import { GetStaticProps, NextPage } from "next";
import { FC, ReactNode, useState } from "react";
import FileInput from "~/_shared/components/FileInput";
import {
  ProductForm,
  TProductFormValues,
} from "~/admin/domain/products/components/product-form";
import { mapFormValuesToDto } from "~/admin/domain/products/utils/mapFormValuesToDto";
import { productAttributesToMap } from "~/_domain/products/utils/productAttributesToMap";
import { TProductPrice } from "~/server/api/products/products.types";
import { api } from "~/utils/api";
import Image from "next/image";
import { Container } from "~/_shared/components/Container";
import { ProductImagesForm } from "~/admin/domain/products/components/product-images-form";
const AdminProductsEditPage: FC<{ id: string }> = ({ id }) => {
  const {
    data: product,
    isLoading,
    error,
  } = api.product.getById.useQuery({ id });
  const { mutate, isLoading: isUpdateLoading } =
    api.product.update.useMutation();
  console.log({ product });

  const { product: productApiCache } = api.useContext();

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>{error.message}</h1>;
  if (!product) return <div> No data.</div>;

  const attributesObj = productAttributesToMap(product.attributes);
  const getInitialValues = () => ({
    description: product.description,
    height: attributesObj.Height as number,
    width: attributesObj.Width as number,
    price: (product.price as TProductPrice).value,
    title: product.title,
    image: product.image,
  });

  const handleSubmit = (values: TProductFormValues) => {
    mutate(
      { ...mapFormValuesToDto(values), id },
      {
        onSuccess: (res) => {
          productApiCache.getById.setData({ id }, res);
        },
      }
    );
  };

  return (
    <Container>
      <Tabs
        className="pt-10"
        tabs={{
          General: (
            <ProductForm
              mode="edit"
              initialValues={getInitialValues()}
              onSubmit={handleSubmit}
            />
          ),
          Images: <ProductImagesForm product={product} />,
        }}
      />
    </Container>
  );
};

interface ITabs<T> {
  tabs: Record<keyof T, ReactNode>;
  onChange?: (tab: keyof T) => void;
  className?: string;
}

const Tabs = <T,>({ tabs, className, onChange }: ITabs<T>) => {
  const keys = Object.keys(tabs);

  const [activeTab, setActiveTab] = useState(keys[0]);
  const changeTab = (name: string) => {
    setActiveTab(name);
    onChange?.(name as keyof T);
  };
  if (!activeTab) throw new Error("We cant get ");
  return (
    <>
      <nav className="flex">
        {keys.map((name) => (
          <button
            onClick={() => changeTab(name)}
            key={name}
            className={`flex-1 border-b-2  py-4  ${
              activeTab === name
                ? "border-primary-600 text-primary-600"
                : "border-transparent"
            }`}
          >
            {name}
          </button>
        ))}
      </nav>
      <div className={className}>{tabs[activeTab as keyof T]}</div>
    </>
  );
};

export const getStaticProps: GetStaticProps<{ id: string }> = (context) => {
  const id = context.params?.id;
  if (typeof id !== "string") throw new Error("no id");
  return {
    props: {
      id,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

export default AdminProductsEditPage;
