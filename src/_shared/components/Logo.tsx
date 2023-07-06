import { cva } from "cva";
import Image from "next/image";
import { type FC } from "react";
const IMG = "https://i.ibb.co/TqmhZ5F/image.png";

const logoVariants = cva(["h-8 w-8 rounded-full object-contain"]);

export const Logo: FC<{ className?: string }> = ({ className }) => {
  return (
    <Image
      src={IMG}
      height={32}
      width={32}
      alt="logo"
      className={logoVariants({ className })}
    />
  );
};
