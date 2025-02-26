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
      <div className="bg-color-accent text-white rounded-xl px-4 py-5 md:p-6 mb-6 md:mb-8 shadow-lg mx-2 md:mx-0">
        <div className="flex flex-col justify-between md:flex-row md:items-start">
          <div className="flex-1 mb-4 md:mb-0">
            <h1 className="text-3xl md:text-4xl font-bold mb-1 md:mb-2 font-amili leading-tight">
              {surahData.name}
            </h1>
            <p className="text-base md:text-xl opacity-90 leading-relaxed">
              {surahData.translation}
            </p>
          </div>

          <div className="md:text-right space-y-2">
            <div className="space-y-1">
              <p className="text-base md:text-lg">
                Surah ke-{surahData.number}
              </p>
              <p className="text-base md:text-lg">
                {surahData.numberOfAyahs} Ayat
              </p>
            </div>
            <p className="text-sm bg-color-dark px-4 py-2 md:px-3 md:py-1 rounded-full w-full md:w-auto block md:inline-block">
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
        <h2 className="text-xl font-semibold mb-4 text-emerald-800">
          Deskripsi Surah
        </h2>
        <p className="text-gray-700 leading-relaxed sm:text-lg text-md text-justify">
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
                className={`${lateef.className} sm:text-4xl text-3xl text-color-dark leading-loose text-right ml-auto`}
                dir="rtl"
              >
                {ayah.arab}
              </div>
              <span className="text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full text-sm">
                {ayah.number.inSurah}
              </span>
            </div>

            <div className="mt-2 text-gray-600 sm:text-lg text-sm">
              {ayah.translation}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Page;
