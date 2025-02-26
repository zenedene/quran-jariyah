"use client"; // Pastikan ini Client Component

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import { getSurahList, getSuratName } from "@/app/libs/api-libs";
import { Lateef } from "next/font/google";
import Loading from "@/app/loading";
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
    <div className="container mx-auto p-6">
      <div className="bg-color-accent text-color-white rounded-xl p-6 mb-8 shadow-lg">
        {/* Teks Arab dan Terjemahan */}
        <div className="mb-4">
          <div
            className={`text-5xl font-bold mb-4 text-center ${lateef.className}`}
            dir="rtl"
          >
            {arab}
          </div>
          <p className="text-lg opacity-90 italic text-center">
            "{translation}"
          </p>
        </div>

        {/* Informasi Surat dan Ayat */}
        <div className="text-center mb-4 p-4 bg-white/10 rounded-xl shadow-lg inline-block">
          <p className="text-2xl font-bold text-white">
            {getSuratName(keyword)}
          </p>
          <div className="w-16 h-1 bg-white rounded-full my-2 mx-auto"></div>
          <p className="text-lg font-medium text-white">
            Ayat ke-{number.inSurah}
          </p>
        </div>

        {/* Audio Section */}
        {Object.keys(audio).length > 0 && (
          <div className="mt-6 border-t pt-4">
            <h3 className="text-lg font-semibold mb-3">Audio Tafsir</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(audio).map(([name, url]) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/20 hover:bg-white/30 rounded-lg p-2 text-sm transition-colors text-center"
                >
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Tafsir Section */}
      <div className="bg-white rounded-xl p-6 mb-8 shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-emerald-800">Tafsir</h2>

        {Object.entries(tafsir).map(([tafsirName, tafsirContent]) => (
          <div key={tafsirName} className="mb-4 last:mb-0">
            <div
              className="flex justify-between items-center cursor-pointer bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() =>
                setActiveTafsir(activeTafsir === tafsirName ? null : tafsirName)
              }
            >
              <h3 className="font-semibold text-lg">
                {tafsirName.charAt(0).toUpperCase() + tafsirName.slice(1)}
              </h3>
              <span className="text-xl">
                {activeTafsir === tafsirName ? "−" : "+"}
              </span>
            </div>

            {activeTafsir === tafsirName && (
              <div className="mt-2 p-4 bg-gray-50 rounded-lg shadow-inner">
                {tafsirContent.short && (
                  <p className="mb-4 text-gray-700 italic">
                    {tafsirContent.short}
                  </p>
                )}
                {tafsirContent.long && (
                  <p className="text-gray-700 leading-relaxed text-justify">
                    {tafsirContent.long}
                  </p>
                )}
                {/* Untuk tafsir yang tidak memiliki properti short/long */}
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
  );
};

export default Page;
