import axios from "axios";
import { env } from "~/env.mjs";
import cloudinary from "cloudinary";
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

export const ImageUploadService = {
  upload: async ({ base64 }: { base64?: string }) => {
    cloudinary.v2.config({
      cloud_name: "oblakscdn",
      api_key: "362917798344984",
      api_secret: "hmaxqmHTOwbaBPvuO6Hgffntaj0",
    });

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
};
