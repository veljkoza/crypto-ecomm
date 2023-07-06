import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Image from "next/image";
import { Container } from "~/_shared/components/Container";

import { api } from "~/utils/api";
import { MdHeight, MdArrowBack } from "react-icons/md";
import { RxWidth } from "react-icons/rx";
import { Product } from "@prisma/client";
import { formatPrice } from "~/_shared/utils";
import { TProductPrice } from "~/server/api/products/products.types";
import { Button } from "~/_shared/components/Button";
import Link from "next/link";

type TProductAttributesKey = "Height" | "Width";
const productAttributesToMap = (attributes: Product["attributes"]) => {
  const parsed = attributes as { name: TProductAttributesKey; value: any }[];
  const obj: Record<TProductAttributesKey, any> = {
    Height: undefined,
    Width: undefined,
  };
  parsed.map((attr) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    obj[attr.name] = attr.value;
  });
  return obj;
};

const ProductDetails: NextPage<{ id: string }> = ({ id }) => {
  console.log({ id });
  const {
    data: product,
    isLoading,
    error,
  } = api.product.getById.useQuery({ id });
  console.log({ product });
  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>{error.message}</h1>;
  if (!product) return <div> No data.</div>;

  const { title, description, attributes, image, price: _price } = product;
  const price = _price as TProductPrice;
  const attributesObj = productAttributesToMap(attributes);

  const imgClasses = "h-20 w-20 min-w-[80px] flex-shrink-0 object-cover ";
  const btnClasses = "overflow-hidden rounded-lg flex-shrink-0";
  return (
    <main className="min-h-screen bg-black-slate-300">
      <header className="absolute left-0 right-0 top-0">
        <Container>
          <Link href="/" className="text-4xl text-white">
            <MdArrowBack />
          </Link>
        </Container>
      </header>
      <Image
        alt={`${title} image`}
        src={image}
        height={384}
        width={500}
        className="h-[420px] w-full object-cover"
      />
      <div className=" mt-3 flex gap-4 overflow-x-auto">
        <div className="w-4"></div>
        <button className={btnClasses}>
          <Image
            alt={`${title} image`}
            src={image}
            height={64}
            width={64}
            className={imgClasses}
          />
        </button>
        <button className={btnClasses}>
          <Image
            alt={`${title} image`}
            src={image}
            height={64}
            width={64}
            className={imgClasses}
          />
        </button>
        <button className={btnClasses}>
          <Image
            alt={`${title} image`}
            src={image}
            height={64}
            width={64}
            className={imgClasses}
          />
        </button>
        <button className={btnClasses}>
          <Image
            alt={`${title} image`}
            src={image}
            height={64}
            width={64}
            className={imgClasses}
          />
        </button>
        <button className={btnClasses}>
          <Image
            alt={`${title} image`}
            src={image}
            height={64}
            width={64}
            className={imgClasses}
          />
        </button>
        <button className={btnClasses}>
          <Image
            alt={`${title} image`}
            src={image}
            height={64}
            width={64}
            className={imgClasses}
          />
        </button>
        <button className={btnClasses}>
          <Image
            alt={`${title} image`}
            src={image}
            height={64}
            width={64}
            className={imgClasses}
          />
        </button>
        <button className={btnClasses}>
          <Image
            alt={`${title} image`}
            src={image}
            height={64}
            width={64}
            className={imgClasses}
          />
        </button>
        <div className="w-4"></div>
      </div>
      <Container className="flex h-full flex-1 flex-col">
        <div className="h-full">
          <div className="flex items-end justify-between">
            <h1 className="font-work text-3xl font-semibold capitalize text-white">
              {title}
            </h1>
            <div className="flex items-end gap-7 text-xl text-neutral-500">
              {attributesObj.Height && (
                <div className="flex items-center pt-1.5">
                  <MdHeight className="-mt-1 inline-block text-2xl" />
                  <span className=" text-white">{attributesObj.Height}cm</span>
                </div>
              )}
              {attributesObj.Width && (
                <div className="flex items-center pt-1.5">
                  <RxWidth className="-mt-1 mr-1 inline-block text-2xl" />
                  <span className=" text-white">{attributesObj.Width}cm</span>
                </div>
              )}
            </div>
          </div>
          <p className="mt-7 text-neutral-400">{description}</p>
        </div>
        <div className="mt-7 flex justify-between">
          <div className="font-mono">
            <p className="text-sm text-neutral-500">Price:</p>
            <p className="font-mono  text-white">
              {formatPrice(price.value, price.currency)}
            </p>
          </div>
          <Button>Buy now</Button>
        </div>
      </Container>
    </main>
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
export default ProductDetails;
