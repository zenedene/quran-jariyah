"use client"; // Pastikan ini Client Component

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import { getSurahList, getSuratName, jumlahAyat } from "@/app/libs/api-libs";
import { Lateef } from "next/font/google";
import Loading from "@/app/loading";
import Link from "next/link";
const lateef = Lateef({
  weight: "400",
  subsets: ["arabic"],
  display: "swap",
});

const Page = () => {
  const params = useParams();
  const { keyword, ayatNumber } = params; // Pastikan parameter sesuai
  const [surahData, setSurahData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTafsir, setActiveTafsir] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!keyword || !ayatNumber) return; // Hindari fetch jika parameter belum ada

      try {
        const endpoint = `surahs/${keyword}/ayahs/${ayatNumber}`;
        const data = await getSurahList(endpoint);
        setSurahData(data);
      } catch (error) {
        console.error("Error fetching surah data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [keyword, ayatNumber]); // Panggil ulang jika parameter berubah

  if (loading) {
    return <Loading />;
  }

  // if (!surahData.name) {
  //   notFound();
  // }

  const { arab, translation, number, audio, tafsir } = surahData;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 sm:py-6">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/50 to-white z-0 pointer-events-none"></div>

      {/* Header Section - Similar to surah list header */}
      <div className="relative z-10 text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-3">
          {getSuratName(keyword)}
        </h1>
        <div className="w-24 h-1 bg-emerald-500 mx-auto mb-4 rounded-full"></div>
        <p className="text-emerald-700 max-w-2xl mx-auto">
          Ayat ke-{number.inSurah}
        </p>
      </div>

      {/* Main Ayat Card */}
      <div className="bg-white rounded-xl overflow-hidden shadow-md border-l-4 border-emerald-500 mb-8 relative z-10">
        <div className="p-6">
          {/* Arabic Text Section */}
          <div className="text-center mb-6">
            <div className="text-center mb-4">
              <span className="flex items-center justify-center bg-emerald-100 text-emerald-700 w-12 h-12 rounded-full text-lg font-bold mx-auto">
                {number.inSurah}
              </span>
            </div>

            <div
              className={`text-4xl font-bold mb-6 text-center ${lateef.className} leading-relaxed`}
              dir="rtl"
            >
              {arab}
            </div>

            {/* Divider with dot - using the style from surah list */}
            <div className="flex items-center my-4">
              <div className="flex-grow h-0.5 bg-gray-100"></div>
              <div className="w-2 h-2 rounded-full bg-emerald-300 mx-2"></div>
              <div className="flex-grow h-0.5 bg-gray-100"></div>
            </div>

            <p className="sm:text-xl text-sm text-gray-700 text-center font-light max-w-2xl mx-auto">
              {translation}
            </p>
          </div>

          {/* Audio Section - Styled like cards in surah list */}
          {Object.keys(audio).length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4 text-emerald-800 flex items-center">
                <svg
                  className="h-5 w-5 mr-2 text-emerald-600"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10S17.5,2,12,2z M9,17H7V10h2V17z M13,17h-2V7h2V17z M17,17h-2V13h2V17z" />
                </svg>
                Audio Tafsir
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(audio).map(([name, url]) => (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white hover:bg-emerald-50 border border-emerald-100 rounded-lg p-3 text-sm transition-all text-center flex items-center justify-center font-medium shadow-sm hover:shadow-md transform hover:-translate-y-1 text-emerald-700"
                  >
                    <svg
                      className="h-4 w-4 mr-2 text-emerald-500"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10S17.5,2,12,2z M10,16.5v-9l6,4.5L10,16.5z" />
                    </svg>
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tafsir Section - Styled to match the cards in surah list */}
      <div className="bg-white rounded-xl overflow-hidden shadow-md border-l-4 border-emerald-500 mb-8 relative z-10">
        <div className="p-6">
          <h2 className="text-xl font-bold text-emerald-800 mb-6 flex items-center">
            <svg
              className="h-5 w-5 mr-2 text-emerald-600"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M21,5c-1.11-0.35-2.33-0.5-3.5-0.5c-1.95,0-4.05,0.4-5.5,1.5c-1.45-1.1-3.55-1.5-5.5-1.5S2.45,4.9,1,6v14.65c0,0.25,0.25,0.5,0.5,0.5c0.1,0,0.15-0.05,0.25-0.05C3.1,20.45,5.05,20,6.5,20c1.95,0,4.05,0.4,5.5,1.5c1.35-0.85,3.8-1.5,5.5-1.5c1.65,0,3.35,0.3,4.75,1.05c0.1,0.05,0.15,0.05,0.25,0.05c0.25,0,0.5-0.25,0.5-0.5V6C22.4,5.55,21.75,5.25,21,5z M21,18.5c-1.1-0.35-2.3-0.5-3.5-0.5c-1.7,0-4.15,0.65-5.5,1.5V8c1.35-0.85,3.8-1.5,5.5-1.5c1.2,0,2.4,0.15,3.5,0.5V18.5z" />
            </svg>
            Tafsir
          </h2>

          <div className="space-y-4">
            {Object.entries(tafsir).map(([tafsirName, tafsirContent]) => (
              <div
                key={tafsirName}
                className="rounded-xl overflow-hidden border border-gray-200 hover:shadow-md transition-all transform hover:-translate-y-1"
              >
                <div
                  className="flex justify-between items-center cursor-pointer bg-white hover:bg-emerald-50 p-4 transition-colors"
                  onClick={() =>
                    setActiveTafsir(
                      activeTafsir === tafsirName ? null : tafsirName
                    )
                  }
                >
                  <h3 className="font-semibold text-lg text-emerald-800 flex items-center">
                    <svg
                      className="h-4 w-4 mr-2 text-emerald-600"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M21,5c-1.11-0.35-2.33-0.5-3.5-0.5c-1.95,0-4.05,0.4-5.5,1.5c-1.45-1.1-3.55-1.5-5.5-1.5S2.45,4.9,1,6v14.65c0,0.25,0.25,0.5,0.5,0.5c0.1,0,0.15-0.05,0.25-0.05C3.1,20.45,5.05,20,6.5,20c1.95,0,4.05,0.4,5.5,1.5c1.35-0.85,3.8-1.5,5.5-1.5c1.65,0,3.35,0.3,4.75,1.05c0.1,0.05,0.15,0.05,0.25,0.05c0.25,0,0.5-0.25,0.5-0.5V6C22.4,5.55,21.75,5.25,21,5z M21,18.5c-1.1-0.35-2.3-0.5-3.5-0.5c-1.7,0-4.15,0.65-5.5,1.5V8c1.35-0.85,3.8-1.5,5.5-1.5c1.2,0,2.4,0.15,3.5,0.5V18.5z" />
                    </svg>
                    {tafsirName.charAt(0).toUpperCase() + tafsirName.slice(1)}
                  </h3>
                  <span className="flex items-center justify-center bg-emerald-100 text-emerald-700 w-6 h-6 rounded-full text-sm font-bold">
                    {activeTafsir === tafsirName ? "−" : "+"}
                  </span>
                </div>

                {activeTafsir === tafsirName && (
                  <div className="p-6 bg-white rounded-b-lg border-t border-gray-100">
                    {tafsirContent.short && (
                      <div className="mb-4 text-gray-700 italic border-l-4 border-emerald-200 pl-4 py-2 bg-gray-50 rounded-r-lg">
                        {tafsirContent.short}
                      </div>
                    )}
                    {tafsirContent.long && (
                      <p className="text-gray-700 leading-relaxed text-justify">
                        {tafsirContent.long}
                      </p>
                    )}
                    {/* For tafsir that doesn't have short/long properties */}
                    {typeof tafsirContent === "string" && (
                      <p className="text-gray-700 leading-relaxed text-justify">
                        {tafsirContent}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation - Consistent with surah list styling */}
      <div className="flex justify-between items-center mt-6 relative z-10">
        {/* Previous Ayat Button */}
        {number.inSurah > 1 ? (
          <Link
            href={`/search/${keyword}/${number.inSurah - 1}`}
            className="flex items-center text-sm sm:text-md px-4 py-2 bg-white border border-emerald-200 rounded-lg shadow-sm hover:shadow-md transition-all text-emerald-700 transform hover:-translate-y-1"
          >
            <svg
              className="h-4 w-4 mr-1"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
            </svg>
            Ayat Sebelumnya
          </Link>
        ) : (
          <div className="px-4 py-2 bg-gray-100 rounded-lg text-gray-400 cursor-not-allowed flex items-center">
            <svg
              className="h-4 w-4 mr-1"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
            </svg>
            Ayat Sebelumnya
          </div>
        )}

        {/* Back to Surah Button */}
        <Link
          href={`/search/${keyword}`}
          className="text-sm sm:text-md px-4 py-2 bg-emerald-500 text-white rounded-lg shadow hover:shadow-md transition-all flex items-center transform hover:-translate-y-1"
        >
          <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" />
          </svg>
          Lihat Surah
        </Link>

        {/* Next Ayat Button */}
        {number.inSurah < jumlahAyat([`${keyword}`]) ? (
          <Link
            href={`/search/${keyword}/${number.inSurah + 1}`}
            className="text-sm sm:text-md flex items-center px-4 py-2 bg-white border border-emerald-200 rounded-lg shadow-sm hover:shadow-md transition-all text-emerald-700 transform hover:-translate-y-1"
          >
            Ayat Berikutnya
            <svg
              className="h-4 w-4 ml-1"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
            </svg>
          </Link>
        ) : (
          <div className="px-4 py-2 bg-gray-100 rounded-lg text-gray-400 cursor-not-allowed flex items-center">
            Ayat Berikutnya
            <svg
              className="h-4 w-4 ml-1"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
