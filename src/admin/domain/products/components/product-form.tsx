import { Product } from "@prisma/client";
import { GetStaticProps, NextPage } from "next";
import Image from "next/image";
import { FC, ReactNode } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "~/_shared/components/Button";
import { Container } from "~/_shared/components/Container";
import { api } from "~/utils/api";

export type TProductFormValues = Pick<Product, "description" | "title"> & {
  height: number;
  width: number;
  price: number;
};

type TFormMode = "edit" | "add";

interface IProductForm {
  initialValues?: TProductFormValues;
  onSubmit: (payload: TProductFormValues) => void;
  mode: TFormMode;
}

export const ProductForm = ({
  initialValues,
  onSubmit,
  mode,
}: IProductForm) => {
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm<TProductFormValues>({
    defaultValues: initialValues,
  });

  const submit: SubmitHandler<TProductFormValues> = (data) =>
    onSubmit?.({ ...data, price: Number(data.price) });

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={handleSubmit(submit)} className="h-full">
      <Container className="flex h-full flex-col">
        {/* <Image
          alt={`product `}
          src={imageSrc}
          height={224}
          width={224}
          className="h-44 w-44 rounded-lg object-cover"
        /> */}

        <div className="mt-5">
          <label htmlFor="title">Name:</label>
          <input
            required
            placeholder="Title"
            className="mt-2 w-full rounded-xl bg-white bg-opacity-60 p-4"
            {...register("title")}
          />
        </div>
        <div className="mt-5">
          <label htmlFor="description">Description:</label>
          <textarea
            required
            placeholder="Description"
            className="mt-2 w-full rounded-xl bg-white bg-opacity-60 p-4"
            {...register("description")}
          />
        </div>
        <div className="flex gap-6">
          <div className="mt-5">
            <label htmlFor="height">Height:</label>
            <input
              required
              placeholder="Height"
              className="mt-2 w-full rounded-xl bg-white bg-opacity-60 p-4"
              {...register("height")}
            />
          </div>
          <div className="mt-5">
            <label htmlFor="width">Width:</label>
            <input
              required
              placeholder="Width"
              className="mt-2 w-full rounded-xl bg-white bg-opacity-60 p-4"
              {...register("width")}
            />
          </div>
        </div>
        <div className="mt-5">
          <label htmlFor="price">Price:</label>
          <input
            required
            placeholder="Price"
            className="mt-2 w-full rounded-xl bg-white bg-opacity-60 p-4"
            {...register("price")}
          />
        </div>
        <div className="mt-10 flex">
          <Button className="ml-auto w-full" type="submit">
            Submit
          </Button>
        </div>
      </Container>
    </form>
  );
};
