import { env } from "~/env.mjs";

type ResponseObject = {
  data: {
    id: string;
    title: string;
    url_viewer: string;
    url: string;
    display_url: string;
    width: string;
    height: string;
    size: string;
    time: string;
    expiration: string;
    image: {
      filename: string;
      name: string;
      mime: string;
      extension: string;
      url: string;
    };
    thumb: {
      filename: string;
      name: string;
      mime: string;
      extension: string;
      url: string;
    };
    medium: {
      filename: string;
      name: string;
      mime: string;
      extension: string;
      url: string;
    };
    delete_url: string;
  };
  success: boolean;
  status: number;
};

export const ImgBBService = {
  upload: async ({ base64 }: { base64?: string }) => {
    const res = await fetch(
      `https://api.imgbb.com/${env.IMG_BB_API_KEY}/upload`,
      {
        method: "POST",
        body: JSON.stringify({ image: base64 }),
      }
    );
    const json = (await res.json()) as ResponseObject;
    console.log({ json });
    return json;
  },
};
