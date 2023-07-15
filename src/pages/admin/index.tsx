import { NextPage } from "next";
import { Router, useRouter } from "next/router";
import { Button } from "~/_shared/components/Button";
import { Container } from "~/_shared/components/Container";
import { ProductCard } from "~/_domain/products/components/product-card/product-card";
import { Routes } from "~/routes";
import { api } from "~/utils/api";

const AdminHome: NextPage = () => {
  const { data: products, isLoading } = api.product.getAll.useQuery();
  // const router = useRouter();

  if (isLoading) return <h1 className="text-4xl">No data.</h1>;
  if (!products) return <h1 className="text-4xl">No data.</h1>;

  const goToEditProduct = (id: string) => Routes.admin.products.edit.push(id);
  const goToAddProduct = () => Routes.admin.products.add.push();

  return (
    <main>
      <Container className="pb-20">
        <h1 className="text-4xl text-white">Products</h1>
        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              body={<ProductCard.Title />}
              image={
                <ProductCard.Image
                  onClick={() => goToEditProduct(product.id)}
                />
              }
              actions={
                <>
                  <ProductCard.Price />{" "}
                  <Button onClick={() => goToEditProduct(product.id)}>
                    Edit
                  </Button>
                </>
              }
            />
          ))}
        </div>
        <Container className="fixed bottom-0 left-0 right-0 flex rounded-none bg-black-rich bg-opacity-30">
          <Button className="mx-auto" onClick={() => goToAddProduct()}>
            Add new +{" "}
          </Button>
        </Container>
      </Container>
    </main>
  );
};

export default AdminHome;
