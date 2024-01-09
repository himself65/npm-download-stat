"use client";

import { useRouter } from "next/navigation";
import { useCallback, useId } from "react";

export function SearchBar() {
  const idPrefix = useId();
  const inputId = `${idPrefix}-search`;

  const router = useRouter();

  const search = useCallback(
    (formData: FormData) => {
      const searchQuery = formData.get(inputId);
      if (searchQuery && typeof searchQuery === "string") {
        router.push(`/${encodeURIComponent(searchQuery)}`);
      }
    },
    [inputId, router],
  );

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full">
        <form
          className="flex flex-col justify-center items-center"
          action={search}
        >
          <div>
            <label className="sr-only" />
            <input
              className="w-full border border-gray-300 p-2 rounded-lg"
              placeholder="a npm package"
              name={inputId}
            />
          </div>
          <button
            className="bg-gray-800 text-white p-2 rounded-lg mt-2"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>
    </>
  );
}
