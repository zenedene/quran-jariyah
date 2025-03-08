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
    <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/50 to-white z-0 pointer-events-none"></div>

      {/* Header Section */}
      <div className="relative z-10">
        <div className="bg-white rounded-xl overflow-hidden shadow-lg border-l-4 border-emerald-500 mb-8">
          <div className="p-6">
            <div className="flex flex-col justify-between md:flex-row md:items-start">
              <div className="flex-1 mb-4 md:mb-0">
                <h1 className="text-3xl md:text-4xl font-bold mb-2 font-amili leading-tight text-emerald-800">
                  {surahData.name}
                </h1>
                <p className="text-base md:text-lg text-emerald-700 leading-relaxed">
                  {surahData.translation}
                </p>
              </div>

              <div className="md:text-right">
                <div className="flex items-center justify-start md:justify-end mb-2">
                  <span className="flex items-center justify-center bg-emerald-100 text-emerald-700 w-12 h-12 rounded-full text-lg font-bold mr-3 md:ml-3 md:mr-0">
                    {surahData.number}
                  </span>
                </div>
                <div className="space-y-2">
                  <p className="text-base text-gray-600 flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {surahData.numberOfAyahs} Ayat
                  </p>
                  <p className="text-sm bg-emerald-100 text-emerald-700 px-4 py-2 md:px-3 md:py-1 rounded-full inline-block">
                    {surahData.revelation}
                  </p>
                </div>
              </div>
            </div>

            {/* Divider with dot */}
            <div className="flex items-center my-5">
              <div className="flex-grow h-0.5 bg-gray-100"></div>
              <div className="w-2 h-2 rounded-full bg-emerald-300 mx-2"></div>
              <div className="flex-grow h-0.5 bg-gray-100"></div>
            </div>

            {/* Bismillah Section */}
            <div className="text-center my-6">
              <div
                className={`${amiri.className} text-4xl sm:text-6xl mb-4 text-emerald-800 leading-relaxed`}
                dir="rtl"
              >
                {surahData.bismillah.arab}
              </div>
              <p className="text-gray-600 italic text-sm sm:text-lg">
                "{surahData.bismillah.translation}"
              </p>
            </div>
          </div>
        </div>

        {/* Surah Description */}
        <div className="bg-white rounded-xl p-6 mb-8 shadow-md border-l-4 border-emerald-500">
          <h2 className="text-xl font-semibold mb-4 text-emerald-800">
            Deskripsi Surah
          </h2>
          <p className="text-gray-700 leading-relaxed sm:text-lg text-sm text-justify">
            {surahData.description}
          </p>
        </div>

        {/* Ayat List */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {surahData.ayahs.map((ayah, index) => (
            <Link
              key={ayah.number.inSurah}
              href={`/search/${surahData.number}/${ayah.number.inSurah}`}
              className="block hover:bg-emerald-50 transition-all duration-200 border-b border-emerald-100 last:border-b-0"
            >
              <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                  {/* Arabic text */}
                  <div
                    className={`${amiri.className} text-4xl text-emerald-800 leading-loose text-right ml-auto`}
                    dir="rtl"
                  >
                    {ayah.arab}
                  </div>

                  {/* Number Badge */}
                  <div className="relative shrink-0 mx-3">
                    {/* Main badge with subtle border */}
                    <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white border border-emerald-200 shadow-sm">
                      {/* Simple decorative ring */}
                      <div className="absolute inset-0.5 rounded-full border border-emerald-100"></div>

                      {/* Number display with clean typography */}
                      <span className="text-sm font-medium text-emerald-700">
                        {ayah.number.inSurah}
                      </span>
                    </div>

                    {/* Subtle bottom shadow */}
                    <div className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-emerald-900/5 blur-sm rounded-full"></div>
                  </div>
                </div>

                {/* Divider with dot */}
                <div className="flex items-center my-3">
                  <div className="flex-grow h-0.5 bg-gray-100"></div>
                  <div className="w-2 h-2 rounded-full bg-emerald-300 mx-2"></div>
                  <div className="flex-grow h-0.5 bg-gray-100"></div>
                </div>

                {/* Translation */}
                <div className="mt-3 text-gray-700 text-sm sm:text-base">
                  {ayah.translation}
                </div>

                {/* Action indicator */}
                <div className="mt-3 flex justify-end">
                  <span className="text-xs font-medium text-emerald-600 hover:text-emerald-700 transition-colors duration-200 flex items-center">
                    Tafsir ayat
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
            </Link>
          ))}
        </div>

        {/* Navigation buttons */}
        <div className="mt-8 flex justify-between">
          <Link
            href={`/search/${Math.max(1, surahData.number - 1)}`}
            className="px-4 py-2 bg-white shadow-md rounded-lg text-emerald-700 flex items-center hover:bg-emerald-50 transition-colors duration-200"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Surah Sebelumnya
          </Link>
          <Link
            href={`/search/${Math.min(114, surahData.number + 1)}`}
            className="px-4 py-2 bg-white shadow-md rounded-lg text-emerald-700 flex items-center hover:bg-emerald-50 transition-colors duration-200"
          >
            Surah Selanjutnya
            <svg
              className="w-4 h-4 ml-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
