import SurahList from "@/app/components/SurahList";
import { getSurahList } from "@/app/libs/api-libs";
import { Lateef, Amiri } from "next/font/google";
import Link from "next/link";
import { notFound } from "next/navigation";

const lateef = Lateef({
  weight: "400",
  subsets: ["arabic"],
  display: "swap",
});
const amiri = Amiri({
  weight: "400",
  subsets: ["arabic"],
  display: "swap",
});

const Page = async ({ params }) => {
  const { keyword } = await params;

  const surahData = await getSurahList(`surahs/${keyword}`);
  if (!surahData.name) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto p-4 min-h-screen">
      <div className="bg-color-accent text-white rounded-xl p-6 mb-8 shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-start mb-4">
          <div>
            <h1 className="text-4xl font-bold mb-2 font-amiri">
              {surahData.name}
            </h1>
            <p className="text-xl opacity-90">{surahData.translation}</p>
          </div>
          <div className="mt-4 md:mt-0 text-right">
            <p className="text-lg">Surah ke-{surahData.number}</p>
            <p className="text-lg">{surahData.numberOfAyahs} Ayat</p>
            <p className="text-sm bg-color-dark px-3 py-1 rounded-full mt-2 inline-block">
              {surahData.revelation}
            </p>
          </div>
        </div>
      </div>

      <div className="text-center mb-8 py-6 border-b-2 border-emerald-100">
        <div
          className={`text-6xl mb-4 text-color-dark leading-relaxed ${lateef.className}`}
          dir="rtl"
        >
          {surahData.bismillah.arab}
        </div>
        <p className="text-gray-600 italic text-lg">
          "{surahData.bismillah.translation}"
        </p>
      </div>

      {/* Surah Description */}
      <div className="bg-white rounded-xl p-6 mb-8 shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-emerald-800">
          Deskripsi Surah
        </h2>
        <p className="text-gray-700 leading-relaxed text-lg text-justify">
          {surahData.description}
        </p>
      </div>

      {/* Ayat List */}
      <div className="space-y-6">
        {surahData.ayahs.map((ayah) => (
          <Link
            key={ayah.number.inSurah}
            href={`/search/${surahData.number}/${ayah.number.inSurah}`}
            className="block bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div
                className={`${lateef.className} text-4xl text-color-dark leading-loose text-right ml-auto`}
                dir="rtl"
              >
                {ayah.arab}
              </div>
              <span className="text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full text-sm">
                {ayah.number.inSurah}
              </span>
            </div>

            <div className="mt-2 text-gray-600 text-lg">{ayah.translation}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Page;
