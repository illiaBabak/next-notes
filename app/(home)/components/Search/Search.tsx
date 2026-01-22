"use client";

import Image from "next/image";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useState } from "react";

export const Search = () => {
  const [isFocusedInput, setIsFocusedInput] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);

    router.push(pathname + "?" + params.toString());
  };

  return (
    <div className="flex flex-row bg-gray-100 w-[220px] md:w-[400px] h-[45px] rounded-xl">
      <div className="w-[45px] h-full flex justify-center items-center">
        <Image
          alt="search"
          src="/search.png"
          width={isFocusedInput ? "30" : "40"}
          height={isFocusedInput ? "30" : "40"}
          className="object-cover mx-1 duration-300"
        />
      </div>

      <input
        className="w-full outline-none"
        placeholder="Search"
        onFocus={() => setIsFocusedInput(true)}
        onBlur={({ currentTarget: { value } }) => {
          setIsFocusedInput(false);
          createQueryString("search", value);
        }}
        onKeyDown={({ code, currentTarget }) => {
          if (code === "Enter") currentTarget.blur();
        }}
      />
    </div>
  );
};
