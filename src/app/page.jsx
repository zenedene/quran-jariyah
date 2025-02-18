import SurahList from "./components/SurahList";
import { getSurahList } from "./libs/api-libs";

const Page = async () => {
  const surahs = await getSurahList("surahs");

  return (
    <>
      <SurahList api={surahs} />
    </>
  );
};

export default Page;
