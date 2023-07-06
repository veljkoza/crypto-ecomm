import { VariantProps, cva } from "cva";
import { FC, HTMLAttributes } from "react";

type TContainerVariants = VariantProps<typeof containerVariants>;

const containerVariants = cva(["rounded-lg", "py-3"], {
  variants: {
    type: {
      page: ["p-4"],
      default: ["p-4"],
    },
  },
});

interface IContainer
  extends HTMLAttributes<HTMLDivElement>,
    TContainerVariants {}

export const Container: FC<IContainer> = ({
  className,
  type = "default",
  ...props
}) => {
  return <div {...props} className={containerVariants({ type, className })} />;
};
