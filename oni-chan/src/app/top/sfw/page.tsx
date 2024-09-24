"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SFWTop() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnimes = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8000/top/sfw");
        const res = await response.json();
        setData(res.anime); // Set the fetched data in state
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false after data fetch or error
      }
    };

    fetchAnimes();
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="py-24 px-10 overflow-x-hidden max-md:px-4">
      <Link
        href={"/vote/sfw"}
        className="text-blue-500 absolute top-4 left-4 hover:text-blue-700 transition-all"
      >
        &lt; Go Back
      </Link>
      {loading ? (
        <p>Loading...</p>
      ) : (
        // <div className="flex justify-center items-start flex-wrap">
        <div className="columns-6 max-2xl:columns-4 mx-auto space-y-4 max-md:columns-2">
          {data.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden h-400px w-300px rounded-md"
            >
              <Image
                src={item.url}
                className="h-full w-full group-hover:scale-105 transition-all"
                height={400}
                width={300}
                objectFit="cover"
                alt="SFW Image"
              />
              <div className="group-hover:hidden transition-all absolute top-0 left-0 bg-gradient-to-t from-black via-transparent to-transparent h-full w-full"></div>
              <p className="absolute bottom-2 left-2 text-xl font-semibold">
                {item.rating} {item.rating > 1 ? "votes" : "vote"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
