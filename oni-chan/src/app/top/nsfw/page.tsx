import Link from "next/link";

export default function NSFWTop() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Link
        href={"/vote/nsfw"}
        className="text-blue-500 absolute top-4 left-4 hover:text-blue-700 transition-all"
      >
        &lt; Go Back
      </Link>
      This Page is Under Maintanance
    </div>
  );
}
