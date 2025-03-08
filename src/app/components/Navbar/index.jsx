import Link from "next/link";

const Navbar = () => {
  return (
    <header className="bg-emerald-500 shadow-md">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Website Title */}
          <Link
            href="/"
            className="text-4xl font-bold text-color-white hover:text-green-100 transition-colors duration-300 z-11"
          >
            Jariyah
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
