import { useState, useEffect } from "react"
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"
import { FaBars, FaTimes } from "react-icons/fa"
import CropForm from "./components/CropForm"
import CropRecommendations from "./components/CropRecommendations"
import Loader from "./components/Loader"
import Weather from "./components/Weather"
import MarketPrice from "./components/MarketPrice"
import CropList from "./components/CropList"
import DiseasePredictor from "./components/DiseasePredictor"
import Home from "./components/Home"
import Logo from "./assets/logo.png"
import FarmBot from "./components/FarmBot"

const App = () => {
  const [recommendations, setRecommendations] = useState("")
  const [loading, setLoading] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [showFarmBot, setShowFarmBot] = useState(false); // ✅ State for FarmBot

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [])

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }
  const toggleFarmBot = () => {
    setShowFarmBot(prev => !prev);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col text-white">

        {/* Navigation */}
        <header className="bg-green-900 shadow-md  z-10 sticky top-0">
          <div className="max-w-7xl mx-auto ">
            <div className="flex justify-between items-center">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <img src={Logo} alt="Smart Farming Logo" className="h-16 w-16 object-contain" />
                <h1 className="text-3xl font-bold text-white">Smart Farming</h1>
              </div>

              {/* Hamburger Menu for Small Screens */}
              <button onClick={toggleMenu} className="text-white text-2xl md:hidden">
                {menuOpen ? <FaTimes /> : <FaBars />}
              </button>

              {/* Desktop Nav */}
              <nav className="hidden md:block">
                <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                  <Link
                    to="/"
                    style={{ textDecoration: "none", color: "white" }}
                    className="text-[15px] text-white [text-decoration:none] hover:[text-decoration:none] transition flex items-center hover:text-blue-400"
                  >
                    🏠 Home
                  </Link>
                  <Link
                    to="/crop"
                    style={{ textDecoration: "none", color: "white" }}
                    className="text-[15px] text-white [text-decoration:none] hover:[text-decoration:none] transition flex items-center hover:text-green-400"
                  >
                    🌾 Crop
                  </Link>
                  <Link
                    to="/weather"
                    style={{ textDecoration: "none", color: "white" }}
                    className="text-[15px] text-white [text-decoration:none] hover:[text-decoration:none] transition flex items-center hover:text-yellow-400"
                  >
                    🌦️ Weather
                  </Link>
                  <Link
                    to="/marketprice"
                    style={{ textDecoration: "none", color: "white" }}
                    className="text-[15px] text-white [text-decoration:none] hover:[text-decoration:none] transition flex items-center hover:text-amber-400"
                  >
                    💰 Market Price
                  </Link>
                  <Link
                    to="/cropstogrow"
                    style={{ textDecoration: "none", color: "white" }}
                    className="text-[15px] text-white [text-decoration:none] hover:[text-decoration:none] transition flex items-center hover:text-green-400"
                  >
                    🌿 Crops to Grow
                  </Link>

                  <Link
                    to="/cropsdisease"
                    style={{ textDecoration: "none", color: "white" }}
                    className="text-[15px] text-white text-decoration:none hover:text-decoration:none transition flex items-center hover:text-red-400"
                  >
                    🦠 Disease Predictor
                  </Link>

                  <Link
                    to="/farmbot"
                    style={{ textDecoration: "none", color: "white" }}
                    className="text-[15px] text-white text-decoration:none hover:text-decoration:none transition flex items-center hover:text-red-400"
                  >
                    🤖 Chat with FarmBot
                  </Link>
                </div>
              </nav>
            </div>
          </div>

          {/* Mobile Menu Overlay */}
          {menuOpen && (
            <div className="fixed inset-0 bg-white z-20 md:hidden">
              <div className="p-4">
                <button onClick={toggleMenu} className="text-black text-2xl mb-4">
                  <FaTimes />
                </button>
                <nav className="flex flex-col space-y-4">
                  <Link
                    onClick={toggleMenu}
                    to="/"
                    style={{ textDecoration: "none", color: "white" }}
                    className="[text-decoration:none] hover:[text-decoration:none] text-[15px] text-black"
                  >
                    🏠 Home
                  </Link>
                  <Link
                    onClick={toggleMenu}
                    to="/crop"
                    style={{ textDecoration: "none", color: "white" }}
                    className="[text-decoration:none] hover:[text-decoration:none] text-[15px] text-black"
                  >
                    🌾 Crop
                  </Link>
                  <Link
                    onClick={toggleMenu}
                    to="/weather"
                    style={{ textDecoration: "none", color: "white" }}
                    className="[text-decoration:none] hover:[text-decoration:none] text-[15px] text-black"
                  >
                    🌦️ Weather
                  </Link>
                  <Link
                    onClick={toggleMenu}
                    to="/marketprice"
                    style={{ textDecoration: "none", color: "white" }}
                    className="[text-decoration:none] hover:[text-decoration:none] text-[15px] text-black"
                  >
                    💰 Market Price
                  </Link>
                  <Link
                    onClick={toggleMenu}
                    to="/cropstogrow"
                    style={{ textDecoration: "none", color: "white" }}
                    className="[text-decoration:none] hover:[text-decoration:none] text-[15px] text-black"
                  >
                    🌿 Crops to Grow
                  </Link>

                  <Link
                    onClick={toggleMenu}
                    to="/cropsdisease"
                    style={{ textDecoration: "none", color: "white" }}
                    className=" text-[15px] text-black"
                  >
                    🦠 Disease Predictor
                  </Link>

                  <Link
                    onClick={toggleMenu}
                    to="/farmbot"
                    style={{ textDecoration: "none", color: "white" }}
                    className=" text-[15px] text-black"
                  >
                    🤖 Chat with FarmBot
                  </Link>
                </nav>
              </div>
            </div>
          )}
        </header>

        {/* Page Content */}
        <main className="flex-grow">
          <Routes>
            {/* Home Route */}
            <Route path="/" element={<Home />} />

            {/* Crop Route */}
            <Route
              path="/crop"
              element={
                <div className="p-6 mx-auto max-w-[95%] md:max-w-[85%] lg:max-w-[70%]">
                  {/* Form */}
                  <CropForm
                    setRecommendations={setRecommendations}
                    setLoading={setLoading}
                  />
                  {/* Recommendations or Loader */}
                  {loading ? (
                    <Loader />
                  ) : (
                    recommendations && (
                      <div className="mt-6">
                        <CropRecommendations recommendations={recommendations} />
                      </div>
                    )
                  )}
                </div>
              }
            />

            {/* Weather Route */}
            <Route
              path="/weather"
              element={
                <div className="p-6 mx-auto max-w-[95%] md:max-w-[85%] lg:max-w-[70%]">
                  <Weather />
                </div>
              }
            />

            {/* Market Price Route */}
            <Route
              path="/marketprice"
              element={
                <div className="p-6 mx-auto max-w-[95%] md:max-w-[85%] lg:max-w-[70%]">
                  <MarketPrice />
                </div>
              }
            />

            {/* Crops to Grow Route */}
            <Route
              path="/cropstogrow"
              element={
                <div className="p-6 mx-auto max-w-[95%] md:max-w-[85%] lg:max-w-[70%]">
                  <CropList />
                </div>
              }
            />

            {/* Crop Disease Predictor Route */}

            <Route
              path="/cropsdisease"
              element={
                <div className="p-6 mx-auto max-w-[95%] md:max-w-[85%] lg:max-w-[70%]">
                  <DiseasePredictor />
                </div>
              }
            />

            {/* FarmBot route (still available directly) */}
            <Route
              path="/farmbot"
              element={
                <div className="p-6 mx-auto max-w-[95%] md:max-w-[85%] lg:max-w-[70%]">
                  <FarmBot />
                </div>
              }
            />
          </Routes>
        </main>

        {/* ✅ Floating FarmBot Chat Widget */}
        <div>
          <button
            onClick={toggleFarmBot}
            style={{borderRadius: "25px", backgroundColor: "#4CAF50", color: "white", padding: "10px 20px", border: "none", cursor: "pointer"}} 
            className="fixed bottom-18 right-6 z-50  bg-green-600 hover:bg-green-700 text-white p-3  shadow-lg transition duration-300 flex items-center gap-2 rounded-2xl"
          >
            🤖 Chat with FarmBot
          </button>

          {showFarmBot && (
            <div className="fixed bottom-32 right-6 z-50 w-[500px] sm:w-[400px] h-[500px] bg-white text-black rounded-2xl shadow-xl overflow-hidden">
              <div className="flex justify-between items-center bg-green-700 text-white px-4 py-2 rounded-t-2xl">
                <h2 className="text-[15px] font-semibold">FarmBot Assistant</h2>
                <button onClick={toggleFarmBot} className="text-2xl">✖</button>
              </div>
              <div className=" h-full overflow-y-auto p-4">
                <FarmBot />
              </div>
            </div>
          )}
        </div>
        
         
        {/* Footer */}
        <footer className="bg-green-800 text-white fixed bottom-0 left-0 w-full text-center shadow-lg z-10"
        style={{ color: "#ecf0f1", fontSize: "14px", borderTop: "1px solid #bdc3c7"}}>
          <p className="py-2">© {new Date().getFullYear()} Smart Farming Assistant. All rights reserved.</p>
        </footer>

      </div>
    </Router>
  )
}

export default App
