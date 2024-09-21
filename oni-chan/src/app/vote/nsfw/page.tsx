import Link from "next/link";

export default function NSFW() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      {" "}
      <Link
        href={"/"}
        className="text-blue-500 absolute top-4 left-4 hover:text-blue-700 transition-all"
      >
        &lt; Go Back
      </Link>
      <Link
        href={"/top/nsfw"}
        className="text-red-500 font-semibold absolute top-4 right-4 text-2xl"
      >
        Top 25 Rated
      </Link>
      This Page is Under Maintanance
    </div>
  );
}
