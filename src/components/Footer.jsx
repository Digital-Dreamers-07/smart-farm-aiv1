import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaYoutube,
    FaPhoneAlt,
    FaEnvelope,
    FaMapMarkerAlt,
  } from "react-icons/fa";
  import { NavLink } from "react-router-dom";
  
  const Footer = () => {
    return (
      <footer className="bg-green-900 text-white px-6 md:px-20 py-12 w-full">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-green-600 pb-10">
          {/* Logo & About */}
          <div>
            <h3 className="text-2xl font-bold flex items-center gap-2">
              <span>🌿</span> Smart Farm
            </h3>
            <p className="mt-4 text-sm">
              Empowering farmers with AI-driven insights for better crop management and higher yields.
            </p>
            <div className="flex gap-4 mt-4 text-xl">
              <FaFacebookF className="hover:text-green-300 cursor-pointer" />
              <FaTwitter className="hover:text-green-300 cursor-pointer" />
              <FaInstagram className="hover:text-green-300 cursor-pointer" />
              <FaYoutube className="hover:text-green-300 cursor-pointer" />
            </div>
          </div>
  
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm pl-0 ml-0">
              <li>
                <NavLink
                  to="/crop-recommendations"
                  style={{ textDecoration: "none", color: "white" }}
                  className={({ isActive }) =>
                    isActive ? "text-green-300" : "hover:text-green-300"
                  }
                >
                  Crop Recommendations
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/disease-detection"
                  style={{ textDecoration: "none", color: "white" }}
                  className={({ isActive }) =>
                    isActive ? "text-green-300" : "hover:text-green-300"
                  }
                >
                  Disease Detection
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/market-prices"
                  style={{ textDecoration: "none", color: "white" }}
                  className={({ isActive }) =>
                    isActive ? "text-green-300" : "hover:text-green-300"
                  }
                >
                  Market Prices
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/crop-details"
                  style={{ textDecoration: "none", color: "white" }}
                  className={({ isActive }) =>
                    isActive ? "text-green-300" : "hover:text-green-300"
                  }
                >
                  Crop Details
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/weather-forecast"
                  style={{ textDecoration: "none", color: "white" }}
                  className={({ isActive }) =>
                    isActive ? "text-green-300" : "hover:text-green-300"
                  }
                >
                  Weather Forecast
                </NavLink>
              </li>
            </ul>
          </div>
  
          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm pl-0 ml-0">
              <li>
                <span style={{ textDecoration: "none", color: "white" }} className="hover:text-green-300 cursor-pointer">
                  Farming Guides
                </span>
              </li>
              <li>
                <span style={{ textDecoration: "none", color: "white" }} className="hover:text-green-300 cursor-pointer">
                  Crop Calendar
                </span>
              </li>
              <li>
                <span style={{ textDecoration: "none", color: "white" }} className="hover:text-green-300 cursor-pointer">
                  Pest Control
                </span>
              </li>
              <li>
                <span style={{ textDecoration: "none", color: "white" }} className="hover:text-green-300 cursor-pointer">
                  Irrigation Tips
                </span>
              </li>
              <li>
                <span style={{ textDecoration: "none", color: "white" }} className="hover:text-green-300 cursor-pointer">
                  Sustainable Farming
                </span>
              </li>
            </ul>
          </div>
  
          {/* Contact Us */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm pl-0 ml-0">
              <li className="flex items-start gap-2">
                <FaMapMarkerAlt className="mt-1" />
                45 Green Field Lane, Smart Agri Hub, Pune, India
              </li>
              <li className="flex items-center gap-2">
                <FaPhoneAlt /> +91 81234 56789
              </li>
              <li className="flex items-center gap-2">
                <FaEnvelope /> info@smartfarm.com
              </li>
            </ul>
          </div>
        </div>
  
        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm pt-6 text-green-200">
          <p>© 2025 Smart Farm. All rights reserved.</p>
          <div className="flex gap-4 mt-2 md:mt-0">
            <a href="#" style={{ textDecoration: "none", color: "white" }} className="hover:text-green-300">
              Privacy Policy
            </a>
            <a href="#" style={{ textDecoration: "none", color: "white" }} className="hover:text-green-300">
              Terms of Service
            </a>
            <a href="#" style={{ textDecoration: "none", color: "white" }} className="hover:text-green-300">
              Cookie Policy
            </a>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  