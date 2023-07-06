import { VariantProps, cva } from "cva";
import { ButtonHTMLAttributes, FC } from "react";

type TButtonVariantsProps = VariantProps<typeof buttonVariants>;

const buttonVariants = cva(["rounded-lg", "py-3"], {
  variants: {
    intent: {
      primary: ["bg-primary-600", "text-primary-100"],
      secondary: ["border-primary-100 bg-transparent", "text-primary-100"],
    },
    size: {
      small: ["px-8"],
      medium: ["px-12"],
    },
  },
  defaultVariants: {
    intent: "primary",
    size: "medium",
  },
});

interface IButton
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    TButtonVariantsProps {}

export const Button: FC<IButton> = ({ intent, size, className, ...props }) => {
  return (
    <button
      {...props}
      className={buttonVariants({ intent, size, className })}
    />
  );
};
