import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="flex items-center justify-center gap-10 max-md:flex-col">
        <Link
          href={"/vote/sfw"}
          className="flex flex-col items-center justify-center text-xl font-semibold"
        >
          <Image
            src={"/assets/anime2.png"}
            height={493}
            width={300}
            className="h-[400px] w-auto max-md:h-[350px]"
            alt="Neko"
          />
          Safe For Work
        </Link>
        <Link
          href={"/vote/nsfw"}
          className="flex flex-col items-center justify-center text-xl font-semibold"
        >
          <Image
            src={"/assets/anime3.png"}
            height={493}
            width={300}
            className="h-[400px] w-auto max-md:h-[350px]"
            alt="Neko"
          />
          Not Safe For Work
        </Link>
      </div>
    </div>
  );
}
