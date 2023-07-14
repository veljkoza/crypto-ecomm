import type { TProductFormValues } from "../components/product-form";

export const mapFormValuesToDto = (values: TProductFormValues) => ({
  title: values.title,
  price: {
    value: values.price,
    currency: "ETH",
  },
  attributes: [
    {
      name: "Height",
      value: values.height,
    },
    {
      name: "Width",
      value: values.width,
    },
  ],
  description: values.description,
});
