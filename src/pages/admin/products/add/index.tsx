import { NextPage } from "next";
import { useRouter } from "next/router";
import { FC } from "react";
import { Container } from "~/_shared/components/Container";
import {
  ProductForm,
  TProductFormValues,
} from "~/admin/domain/products/components/product-form";
import { mapFormValuesToDto } from "~/admin/domain/products/utils/mapFormValuesToDto";
import { Routes } from "~/routes";
import { api } from "~/utils/api";

const AdminProductsAddPage: FC<NextPage> = () => {
  const router = useRouter();
  const { mutate, isLoading } = api.product.create.useMutation();
  const handleSubmit = (values: TProductFormValues) =>
    mutate(mapFormValuesToDto(values), {
      onSuccess: (res) => {
        Routes.admin.products.edit.replace(res.id);
      },
    });
  return (
    <main className="flex h-full min-h-screen flex-col">
      <h1>Add Product</h1>
      <ProductForm mode="add" onSubmit={handleSubmit} />
    </main>
  );
};

export default AdminProductsAddPage;
