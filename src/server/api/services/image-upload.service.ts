import axios from "axios";
import { env } from "~/env.mjs";
import cloudinary from "cloudinary";
import { TRPCError } from "@trpc/server";
type ImageFile = {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: string[];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  folder: string;
  api_key: string;
};

cloudinary.v2.config({
  cloud_name: env.CLOUDINARY_CLOUD,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

export const ImageUploadService = {
  upload: async ({ base64 }: { base64?: string }) => {
    console.log({ base64 });
    if (!base64) return;
    try {
      const data = await cloudinary.v2.uploader.upload(base64);
      console.log({ data });
      return data;
    } catch (error) {
      console.log({ error });
    }
  },
  destroy: async ({ publicId }: { publicId: string }) => {
    try {
      await cloudinary.v2.uploader.destroy(publicId);
    } catch (error) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Error while deleting image using image upload service",
        cause: error,
      });
    }
  },
};
