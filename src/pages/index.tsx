import Head from "next/head";
import Link from "next/link";
import { ProductCard } from "~/domain/product/components/product-card/product-card";
import { Button } from "~/shared/components/Button";
import { api } from "~/utils/api";

export default function Home() {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col  justify-center p-4">
        {/* <Button>Buy now</Button> */}
        <ProductCard />
      </main>
    </>
  );
}
