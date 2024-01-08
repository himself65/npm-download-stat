"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function SearchBar() {
  const router = useRouter();
  const [pkg, setPkg] = useState("");
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 dark:bg-gray-900">
      <div className="flex flex-col justify-center items-center w-full">
        <div className="flex flex-row justify-center items-center">
          <input
            className="w-1/2 border border-gray-300 p-2 rounded-lg"
            defaultValue="react"
            placeholder="a npm package"
            value={pkg}
            onChange={(e) => setPkg(e.target.value)}
          />
        </div>
      </div>
      <button
        className="bg-gray-800 text-white p-2 rounded-lg mt-2"
        onClick={() => {
          router.push(`/${encodeURIComponent(pkg)}`);
        }}
      >
        Search
      </button>
    </div>
  );
}
