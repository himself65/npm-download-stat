"use client";
import { useCompositionInput } from "foxact/use-composition-input";
import { useRouter } from "next/navigation";
import { useCallback, useRef } from "react";

export function SearchBar() {
  const router = useRouter();
  const inputRef = useRef("");
  const inputProps = useCompositionInput(
    useCallback((value: string) => {
      inputRef.current = value;
    }, []),
  );
  return (
    <>
      <div className="flex flex-col justify-center items-center w-full">
        <form
          className="flex flex-col justify-center items-center"
          onSubmit={(e) => {
            e.preventDefault();
            router.push(`/${encodeURIComponent(inputRef.current)}`);
          }}
        >
          <div>
            <label className="sr-only" />
            <input
              className="w-full border border-gray-300 p-2 rounded-lg"
              placeholder="a npm package"
              {...inputProps}
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
