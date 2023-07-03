import { PrismaClient } from "@prisma/client";
const IMG =
  "https://instagram.ftgd1-1.fna.fbcdn.net/v/t51.2885-15/352431925_775318890726418_4253163740566604307_n.jpg?stp=dst-jpg_e35_s1080x1080&_nc_ht=instagram.ftgd1-1.fna.fbcdn.net&_nc_cat=110&_nc_ohc=batTqXjRHk0AX9M3zn8&edm=AP_V10EBAAAA&ccb=7-5&ig_cache_key=MzExOTQ4NzQwMjk0MTM5ODM4Ng%3D%3D.2-ccb7-5&oh=00_AfDKethy2zxnAd7W7dSbF_z7S9Gr9HzRTRxb26EYBx6R6w&oe=64A77399&_nc_sid=2999b8";

const IMG2 =
  "https://instagram.ftgd1-1.fna.fbcdn.net/v/t51.2885-15/351449062_278067678060725_4760524425961646703_n.jpg?stp=dst-jpg_e35_s1080x1080&_nc_ht=instagram.ftgd1-1.fna.fbcdn.net&_nc_cat=105&_nc_ohc=0OW7Gy_VV_8AX-rXavo&edm=AP_V10EBAAAA&ccb=7-5&ig_cache_key=MzExOTQ4NTc0ODk1OTU3MDA2MQ%3D%3D.2-ccb7-5&oh=00_AfDBLx0V6Unr_m9BXDQTcBZLSRjjZTLswyL5_Qw9JVsO9w&oe=64A84813&_nc_sid=2999b8";
const IMG3 =
  "https://instagram.ftgd1-1.fna.fbcdn.net/v/t51.2885-15/350482966_1659433591171800_1767067953312850138_n.jpg?stp=dst-jpg_e35_p1080x1080&_nc_ht=instagram.ftgd1-1.fna.fbcdn.net&_nc_cat=100&_nc_ohc=OL-qQJQ2auoAX-Gk5Vf&edm=AP_V10EBAAAA&ccb=7-5&oh=00_AfDMBbf5G4rTtsU7dlg0j6V8E3aGnZGjE_Zrt4zY9juq2g&oe=64A87BE3&_nc_sid=2999b8";

const prisma = new PrismaClient();

const randomFromArray = (array: any[]) =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  array[Math.floor(Math.random() * array.length)];

const rNames = ["Oazica", "Mrvica", "Pustinjica", "Lagana setnjica"];
const rImages = [IMG, IMG2, IMG3];
const randominator = {
  name: () => randomFromArray(rNames) as string,
  price: () => Math.random(),
  img: () => randomFromArray(rImages) as string,
};

async function main() {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  for (const name of rNames) {
    await prisma.product.create({
      data: {
        title: name,
        image: randominator.img(),
        description: ` Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi laudantium
              repellendus aperiam obcaecati, reprehenderit ipsam fugiat similique iste
              quam distinctio dolorem mollitia dolores inventore corrupti aspernatur.
              Quibusdam voluptatibus doloremque repellat.`,
        price: {
          value: randominator.price(),
          currency: "ETH",
        },
        status: "ACTIVE",
        attributes: [{ name: "Height", value: 22 }],
      },
      select: {
        attributes: true,
        title: true,
        id: true,
        image: true,
        description: true,
        price: true,
        status: true,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
