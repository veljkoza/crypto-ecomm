import Image from "next/image";
import { Button } from "~/shared/components/Button";
const IMG =
  "https://instagram.ftgd1-1.fna.fbcdn.net/v/t51.2885-15/352431925_775318890726418_4253163740566604307_n.jpg?stp=dst-jpg_e35_s1080x1080&_nc_ht=instagram.ftgd1-1.fna.fbcdn.net&_nc_cat=110&_nc_ohc=batTqXjRHk0AX9M3zn8&edm=AP_V10EBAAAA&ccb=7-5&ig_cache_key=MzExOTQ4NzQwMjk0MTM5ODM4Ng%3D%3D.2-ccb7-5&oh=00_AfDKethy2zxnAd7W7dSbF_z7S9Gr9HzRTRxb26EYBx6R6w&oe=64A77399&_nc_sid=2999b8";

export const ProductCard = () => {
  return (
    <article className="flex  flex-col overflow-hidden rounded-lg bg-black-slate-300 shadow-lg">
      <Image
        src={IMG}
        alt="Terrarium"
        className="block h-64 w-full object-cover"
        width={288}
        height={320}
      />
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <h1 className="font-work text-2xl font-semibold capitalize text-white">
            Oazica
          </h1>
        </div>
        <p className="line-clamp-3 text-sm text-neutral-400">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi
          laudantium repellendus aperiam obcaecati, reprehenderit ipsam fugiat
          similique iste quam distinctio dolorem mollitia dolores inventore
          corrupti aspernatur. Quibusdam voluptatibus doloremque repellat.
        </p>
        <div className=" mt-5  flex justify-between">
          <div className="font-mono">
            <p className="text-sm text-neutral-500">Price:</p>
            <p className="font-mono  text-white">0.004 ETH </p>
          </div>
          <Button>Buy now</Button>
        </div>
      </div>
    </article>
  );
};
