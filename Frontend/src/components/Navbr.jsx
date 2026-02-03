// src/components/Navbar.jsx
import { useEffect, useState } from "react";
import { TbMenuDeep, TbX } from "react-icons/tb";
import { Link } from "react-router-dom";
import Logo from "../../Public/Image/Logo.png";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Events", path: "/events" },
    { name: "Stories", path: "/stories" },
    { name: "About us", path: "/about" },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-300
        ${
          isScrolled
            ? "bg-white/30 backdrop-blur-md border-b border-white/30"
            : "bg-white border-b border-[#e7dfd7]"
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1">
            <img src={Logo} alt="Logo" className="w-[70px]" />
            <h1 className="text-xl font-extrabold tracking-tight text-[#2c5466]">
              Monark <span className="text-[#2c5466]">Foundation</span>
            </h1>
          </Link>

       
          {/* Desktop Links - Perfect Center */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-sm text-black font-semibold hover:text-orange-600 relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-orange-600 after:transition-all hover:after:w-full"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link to="/register">
              <button className="hidden sm:flex h-10 p-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold">
                Register
              </button>
            </Link>
            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-black rounded-lg hover:bg-black/5"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <TbX size={28} /> : <TbMenuDeep size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-[#e7dfd7] text-black">
          <div className="flex flex-col gap-4 px-6 py-4">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-semibold hover:text-orange-600"
              >
                {item.name}
              </Link>
            ))}

            <Link to="/register">
              {" "}
              <button className="mt-2 h-11 w-full rounded-lg bg-orange-500 text-white font-bold">
                Register
              </button>{" "}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
