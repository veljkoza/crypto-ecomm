import { ZodTypeAny, z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { Prisma, Product } from "@prisma/client";
import { productDto } from "./products.types";
import { productsRepository } from "./repository";
import { TRPCError } from "@trpc/server";
import { ImageUploadService } from "../services/image-upload.service";

export const productZodSchema = {
  title: z.string(),
  description: z.string(),
  price: z.object({ value: z.number(), currency: z.string() }),
  attributes: z.array(z.object({ name: z.string(), value: z.any() })),
};

const createProductZodSchema = z.object(productZodSchema);

const createProduct = publicProcedure
  .input(createProductZodSchema)
  .mutation(async ({ ctx, input }) => {
    const newProduct = await ctx.prisma.product.create({
      data: {
        title: input.title,
        description: input.description,
        price: input.price,
        status: "PUBLISHED",
        attributes: input.attributes,
      },
    });
    return newProduct;
  });

const updateProductZodSchema = z.object({
  ...productZodSchema,
  title: z.string().optional(),
  description: z.string().optional(),
  price: z
    .object({
      value: z.number().optional(),
      currency: z.string().optional(),
    })
    .optional(),
  attributes: z
    .array(z.object({ name: z.string().optional(), value: z.any().optional() }))
    .optional(),
  id: z.string(),
});
// export type TUpdateProductDTO = z.infer<typeof updateProductZodSchema>;
export type TUpdateProductDTO = Omit<
  Prisma.ProductUpdateArgs["data"],
  "id" | "createdAt" | "image" | "gallery"
> & {
  id: string;
  assetId?: string; // add imageId in DTO to connect the image
};

const updateProduct = publicProcedure
  .input(updateProductZodSchema)
  .mutation(async ({ ctx, input }) => {
    const product = await productsRepository.updateProduct(input);
    return product;
  });

export const productsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const products = await ctx.prisma.product.findMany({
      select: productDto,
    });
    return products;
  }),
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const product = await productsRepository.getById(input.id);
      return product;
    }),
  create: createProduct,
  update: updateProduct,
  setProductImage: publicProcedure
    .input(z.object({ base64: z.string(), id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const res = await ImageUploadService.upload({ base64: input.base64 });
        if (!res)
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Something went wrong while uploading image",
          });
        const product = await productsRepository.getById(input.id);
        const asset = await ctx.prisma.asset.create({
          data: {
            extension: res.format,
            name: `${product.title}-${product.id}-${res.public_id}`,
            url: res.url,
            publicId: res.public_id,
          },
        });
        const updatedProduct = await productsRepository.updateProduct({
          assetId: asset.id,
          id: input.id,
        });

        return updatedProduct;
      } catch (error) {
        console.log("upload error", error);
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Something went wrong while uploading image",
        });
      }
    }),
  addImageToProductGallery: publicProcedure
    .input(z.object({ base64: z.string(), id: z.string(), order: z.number() }))
    .mutation(async ({ ctx, input }) => {
      /**
       * 1. upload file to cdn
       * 2. create product galler image
       * 3. connect somehow asset id to the image gallery
       */
      const res = await ImageUploadService.upload({ base64: input.base64 });
      if (!res)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Something went wrong while uploading image",
        });

      const asset = await ctx.prisma.asset.create({
        data: {
          extension: res.format,
          name: `${input.id}-${res.public_id}`,
          url: res.url,
          publicId: res.public_id,
        },
        select: {
          id: true,
        },
      });
      const galleryImage = await ctx.prisma.productGalleryImage.create({
        data: {
          order: input.order,
          asset: {
            connect: {
              id: asset.id,
            },
          },
        },
        select: {
          asset: true,
          order: true,
          id: true,
        },
      });

      const updatedProduct = await ctx.prisma.product.update({
        where: {
          id: input.id,
        },
        data: {
          gallery: {
            connect: {
              id: galleryImage.id,
            },
          },
        },
        select: {
          ...productDto,
        },
      });

      return updatedProduct;
    }),
  deleteImageFromProductGallery: publicProcedure
    .input(
      z.object({
        imageId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const deletedImage = await ctx.prisma.productGalleryImage.delete({
        where: {
          id: input.imageId,
        },
        select: {
          id: true,
          productId: true,
          asset: {
            select: {
              publicId: true,
            },
          },
        },
      });

      try {
        await ImageUploadService.destroy({
          publicId: deletedImage.asset.publicId,
        });
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Error while trying to delete image from remote cdn. ${deletedImage.asset.publicId}`,
        });
      }

      return deletedImage;
    }),
});
