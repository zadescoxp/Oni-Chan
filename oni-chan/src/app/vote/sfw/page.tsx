"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SFW() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState("");
  const [rating, setRating] = useState(0);
  const [id, setId] = useState("");

  useEffect(() => {
    const getSFWImages = async () => {
      setLoading(true);
      await fetch("http://localhost:8000/api/sfw");
      const res = await fetch("http://localhost:8000/vote/sfw").then(
        async (res) => await res.json()
      );
      setData(res.url);
      setRating(res.rating);
      setId(res.id);
      setLoading(false);
    };

    getSFWImages();
  }, [rating]);

  const Hot = async () => {
    await fetch(`http://localhost:8000/vote/sfw/${id}`);
    window.location.reload();
  };

  const Not = () => {
    window.location.reload();
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col">
      <Link href={"/"} className="text-blue-600 absolute top-4 left-4">
        &lt; Go Back
      </Link>
      {loading ? (
        <div className="flex flex-col items-center justify-center gap-3">
          <Image
            src={"/assets/loading.gif"}
            height={400}
            width={400}
            alt="Loading"
          />
          <p className="text-3xl font-bold">LOADING</p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-10">
          <div className="flex flex-col items-center justify-center gap-10">
            <Image
              src={data}
              height={400}
              width={400}
              className="h-[400px] w-auto"
              alt="Anime SFW Image"
            />
            <p className="text-xl font-semibold">Rating : {rating}</p>
          </div>

          <div className="flex items-center justify-center gap-10">
            <button
              className="bg-red-600 text-2xl font-semibold px-7 py-4 hover:bg-[#ff0000] transition-all"
              onClick={Hot}
            >
              HOT 🥵
            </button>
            <button
              className="bg-[#e0e0e0] text-black text-2xl font-semibold px-7 py-4 hover:bg-white transition-all"
              onClick={Not}
            >
              NOT 🤢
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
