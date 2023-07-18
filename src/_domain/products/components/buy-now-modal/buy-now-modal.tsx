import { Transition, Dialog } from "@headlessui/react";
import { ReactNode, FC, useState, Fragment } from "react";
import { Button } from "~/_shared/components/Button";
import { formatPrice } from "~/_shared/utils";
import { TProductPrice } from "~/server/api/products/products.types";
import { ProductDTO } from "../../types";
import { TBuyNowFn, useBuyNowModal } from "./useBuyNowModal";
import { PaymentMethod } from "@prisma/client";

interface IBuyNowModal {
  renderButton: ({ buyNow }: { buyNow: TBuyNowFn }) => ReactNode;
  onBuy?: (params: {
    method: PaymentMethod;
    product: ProductDTO;
    closeModal: () => void;
  }) => void;
  renderLoading?: () => ReactNode;
}

export const BuyNowModal: FC<IBuyNowModal> = ({
  renderButton,
  onBuy,
  renderLoading,
}) => {
  const { buyNow, closeModal, isOpen, product, price } = useBuyNowModal();
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10 " onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black-rich bg-opacity-50" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                {product && (
                  <Dialog.Panel className="relative w-full max-w-md transform overflow-hidden rounded-lg bg-black-slate-300 p-6 text-left align-middle shadow-lg transition-all">
                    <Dialog.Title
                      as="h3"
                      className="mb-5 text-center font-work text-2xl font-semibold  text-white"
                    >
                      You are about to buy{" "}
                      <span className="capitalize text-primary-600">
                        {product?.title}
                      </span>{" "}
                      for{" "}
                      <span className="text-primary-600">
                        {price && formatPrice(price.value, price.currency)}
                      </span>
                    </Dialog.Title>
                    <Button
                      className="w-full"
                      onClick={() =>
                        onBuy?.({ method: "CRYPTO", product, closeModal })
                      }
                    >
                      Pay with Crypto
                    </Button>
                    <p className=" mb-2 mt-5 text-center text-white">or</p>
                    <Button
                      intent="secondary"
                      className="w-full"
                      onClick={() =>
                        onBuy?.({ method: "ON_DELIVERY", product, closeModal })
                      }
                    >
                      Pay on delivery
                    </Button>
                    {renderLoading?.()}
                  </Dialog.Panel>
                )}
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      {renderButton({ buyNow })}
    </>
  );
};
