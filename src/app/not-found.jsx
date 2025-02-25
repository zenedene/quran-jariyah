const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#A8D5BA] text-[#2F6B57]">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-xl font-medium mb-6 items-center text-center">
        Kembalilah, engkau sedang berada di path yang salah
      </p>
      <a
        href="/"
        className="px-6 py-2 bg-[#4B9F8E] text-white rounded-lg hover:bg-[#6CCB81] transition"
      >
        Kembali ke Beranda
      </a>
    </div>
  );
};

export default Page;
