import Link from "next/link";

const SurahList = ({ api }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 sm:py-6">
      {/* Centering container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-6">
        {/* Reduced grid gap */}
        {api.map((data) => (
          <div
            key={data.number}
            className="group bg-[#FBFBFE] p-4 rounded-lg border-[#2F6B57] hover:border-[#6CCB81] 
        transition-all duration-200 hover:bg-[#A8D5BA] shadow-md hover:shadow-lg"
          >
            <Link
              href={`/search/${data.number}`}
              className="cursor-pointer block h-full"
            >
              {/* Order Badge */}
              <div className="mb-2">
                {/* Reduced margin */}
                <span
                  className="inline-block bg-[#A8D5BA] text-[#2F6B57] px-2 py-1 rounded-full text-xs font-semibold 
              transition-colors duration-200 group-hover:bg-[#6CCB81] group-hover:text-[#FBFBFE]"
                >
                  {data.number}
                </span>
              </div>

              {/* Arabic Name */}
              <h2
                className="text-xl font-bold text-left mb-1 text-[#2F6B57]  {/* Reduced text size */}
            group-hover:text-[#FBFBFE] transition-colors duration-200 leading-tight"
              >
                {data.name}
              </h2>

              {/* Translation */}
              <h3
                className="text-sm text-[#4B9F8E]  {/* Smaller text */}
            group-hover:text-[#FBFBFE] transition-colors duration-200"
              >
                {data.translation}
              </h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SurahList;
