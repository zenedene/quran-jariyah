export const getSurahList = async (resource) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/${resource}`
  );
  const surah = await response.json();
  return surah;
};
