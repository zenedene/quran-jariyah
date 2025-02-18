"use client";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useRef } from "react";

const InputSearch = () => {
  const searcRef = useRef();
  const router = useRouter();

  const handleSearch = (event) => {
    const keyword = searcRef.current.value;

    if (!keyword) return;

    if (event.key === "Enter" || event.type === "click") {
      event.preventDefault();

      router.push(`/search/${keyword}`);
    }
  };

  return (
    <div className="relative">
      <input
        type="number"
        ref={searcRef}
        min={1}
        max={114}
        onKeyDown={handleSearch}
        placeholder="Cari surat berdasarkan urutan..."
        className="w-full md:w-96 px-4 py-2 rounded-lg border border-[#4B9F8E] focus:outline-none focus:ring-2 focus:ring-[#6CCB81] focus:border-transparent placeholder-[#A8D5BA] bg-[#E8F6EC] text-[#2F6B57] appearance-none -moz-appearance:textfield [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <button className="absolute top-1.5 end-3" onClick={handleSearch}>
        <MagnifyingGlass size={27} />
      </button>
    </div>
  );
};

export default InputSearch;
