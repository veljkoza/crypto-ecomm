import { Product } from "@prisma/client";

type TProductAttributesKey = "Height" | "Width";
export const productAttributesToMap = (attributes: Product["attributes"]) => {
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
