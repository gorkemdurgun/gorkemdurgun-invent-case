"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className=" flex flex-col items-center justify-center gap-2 text-center h-screen">
      <p>
        Hey, I'm <span className="font-semibold">Görkem Durgun</span>, a front-end developer.
      </p>
      <p>I hope you enjoy my case study.</p>
      <Link href="/movies" className="font-bold text-2xl text-blue-500 p-4 mt-4 border-2 border-blue-500 animate-pulse">
        Click here to see the case study
      </Link>
    </div>
  );
}
