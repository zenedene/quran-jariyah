"use client";
import Link from "next/link";
import { useRef } from "react";
import { useRouter } from "next/navigation";

const SurahList = ({ api }) => {
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
    <div className="max-w-6xl mx-auto px-4 py-12 sm:py-6">
      {/* Background pattern */}
      <div className="absolute inset-0 from-emerald-50/50 to-white z-0 pointer-events-none"></div>

      {/* Header Section */}
      <div className="relative z-10 text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-3">
          Daftar Surah Al-Qur'an
        </h1>
        <div className="w-24 h-1 bg-emerald-500 mx-auto mb-4 rounded-full"></div>
        <p className="text-emerald-700 max-w-2xl mx-auto">
          Pilih surah yang ingin Anda baca, pelajari dan pahami maknanya
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative z-10 max-w-md mx-auto mb-10">
        <div className="relative">
          <input
            type="number"
            ref={searcRef}
            min={1}
            max={114}
            onKeyDown={handleSearch}
            placeholder="Cari surah..."
            className="w-full px-4 py-3 pl-12 rounded-full border border-emerald-200 focus:ring-2 focus:ring-emerald-300 focus:outline-none bg-white shadow-sm"
          />
          <svg
            className="absolute left-4 top-3.5 h-5 w-5 text-emerald-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {api.map((data) => (
          <Link
            key={data.number}
            href={`/search/${data.number}`}
            className="group transition-all duration-300 block"
          >
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-emerald-500 h-full transform hover:-translate-y-1 hover:border-l-8">
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  {/* Arabic Name with decorative background */}
                  <h2 className="text-xl font-bold text-emerald-800 group-hover:text-emerald-600 transition-colors duration-200 leading-tight">
                    {data.name}
                  </h2>

                  {/* Number Badge */}
                  <span className="flex items-center justify-center bg-emerald-100 text-emerald-700 w-10 h-10 rounded-full text-sm font-bold group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                    {data.number}
                  </span>
                </div>

                {/* Divider with dot */}
                <div className="flex items-center my-3">
                  <div className="flex-grow h-0.5 bg-gray-100"></div>
                  <div className="w-2 h-2 rounded-full bg-emerald-300 mx-2"></div>
                  <div className="flex-grow h-0.5 bg-gray-100"></div>
                </div>

                {/* Translation with better typography */}
                <div className="mt-3">
                  <h3 className="text-sm text-gray-600 group-hover:text-emerald-700 transition-colors duration-200">
                    {data.translation}
                  </h3>

                  {/* Additional info - can be customized based on your data */}
                  <div className="flex items-center mt-3 text-xs text-gray-500">
                    <span className="flex items-center mr-3">
                      <svg
                        className="w-3 h-3 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {data.numberOfAyahs || "..."} Ayat
                    </span>
                    <span className="flex items-center">
                      <svg
                        className="w-3 h-3 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                        <path
                          fillRule="evenodd"
                          d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {data.revelation || "..."}
                    </span>
                  </div>
                </div>

                {/* Read more indicator */}
                <div className="mt-4 flex justify-end">
                  <span className="text-xs font-medium text-emerald-600 group-hover:text-emerald-700 transition-colors duration-200 flex items-center">
                    Baca surah
                    <svg
                      className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform duration-200"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination Component */}
    </div>
  );
};

export default SurahList;
