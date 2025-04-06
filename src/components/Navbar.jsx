import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import Logo from "../assets/logo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const navLinks = [
    // Removed Home 👇
    { to: "/crop", label: "Crop" },
    { to: "/weather", label: "Weather" },
    { to: "/marketprice", label: "Market Price" },
    { to: "/cropstogrow", label: "Crops to Grow" },
    { to: "/cropsdisease", label: "Disease Predictor" },
    { to: "/farmbot", label: "Chat with FarmBot" },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-16">
        {/* Logo */}
        <div className="flex items-center gap-2">
          {/* 🔗 Logo with Link to home */}
        <Link to="/" style={{ textDecoration: "none" }} className="flex items-center gap-2">
          <img src={Logo}  alt="Smart Farming Logo" className="h-10 w-10 object-contain" />
          <span className="text-xl font-bold text-green-700">Smart Farming</span>
        </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              style={{ textDecoration: "none" }}
              className={`text-base font-medium text-black hover:text-green-600 transition ${
                location.pathname === link.to ? "text-green-700 font-normal" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-2xl text-green-700">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <nav className="flex flex-col px-6 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                style={{ textDecoration: "none" }}
                className={`text-lg font-light text-black hover:text-green-600 transition ${
                  location.pathname === link.to ? "text-green-700 font-normal" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
