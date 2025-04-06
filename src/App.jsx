import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import CropForm from "./components/CropForm";
import CropRecommendations from "./components/CropRecommendations";
import Loader from "./components/Loader";
import Weather from "./components/Weather";
import MarketPrice from "./components/MarketPrice";
import CropList from "./components/CropList";
import DiseasePredictor from "./components/DiseasePredictor";
import Home from "./components/Home";
import FarmBot from "./components/FarmBot";
import Feature from "./components/Features";
import Reviews from "./components/Reviews";
import Mission from "./components/Mission";
import Footer from "./components/Footer";

const PageWrapper = ({ children }) => (
  <div className="p-6 mx-auto max-w-[95%] md:max-w-[85%] lg:max-w-[70%]">
    {children}
  </div>
);

const MainContent = () => {
  const [recommendations, setRecommendations] = useState("");
  const [loading, setLoading] = useState(false);
  const [showFarmBot, setShowFarmBot] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  const toggleFarmBot = () => setShowFarmBot(prev => !prev);

  return (
    <>
      {/* Main Routing */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/crop"
            element={
              <PageWrapper>
                <CropForm
                  setRecommendations={setRecommendations}
                  setLoading={setLoading}
                />
                {loading ? (
                  <Loader />
                ) : (
                  recommendations && (
                    <div className="mt-6">
                      <CropRecommendations recommendations={recommendations} />
                    </div>
                  )
                )}
              </PageWrapper>
            }
          />
          <Route path="/weather" element={<PageWrapper><Weather /></PageWrapper>} />
          <Route path="/marketprice" element={<PageWrapper><MarketPrice /></PageWrapper>} />
          <Route path="/cropstogrow" element={<PageWrapper><CropList /></PageWrapper>} />
          <Route path="/cropsdisease" element={<PageWrapper><DiseasePredictor /></PageWrapper>} />
          <Route path="/farmbot" element={<PageWrapper><FarmBot /></PageWrapper>} />
        </Routes>
      </main>

      {/* ✅ Only show these on Home page */}
      {isHomePage && (
        <>
          <div className="bg-[#f9fafb] text-black py-10 px-4">
            <Feature />
          </div>
          <div className="bg-[#f9fafb] text-black py-10 px-4">
            <Reviews />
          </div>
          <div className="bg-green-800 w-full text-black py-10 px-4">
            <Mission />
          </div>

          <div>
            {/* <button
              onClick={toggleFarmBot}
              style={{
                borderRadius: "1rem", // same as rounded-2xl // Tailwind green-800
                padding: "0.75rem 1.5rem", // similar to p-3
                fontSize: "14px"
              }}
              className="fixed bg-green-600 bottom-20 right-6 z-50 text-white shadow-lg transition duration-300 flex items-center gap-2 hover:bg-green-700"
            >
              🤖 Chat with FarmBot
            </button> */}


            {showFarmBot && (
              <div className="fixed bottom-32 right-6 z-50 w-[500px] sm:w-[400px] h-[500px] bg-white text-black rounded-2xl shadow-xl overflow-hidden">
                <div className="flex justify-between items-center bg-green-700 text-white px-4 py-2 rounded-t-2xl">
                  <h2 className="text-[15px] font-semibold">FarmBot Assistant</h2>
                  <button onClick={toggleFarmBot} className="text-2xl">✖</button>
                </div>
                <div className="h-full overflow-y-auto p-4">
                  <FarmBot />
                </div>
              </div>
            )}
          </div>

          <footer className="bg-green-900 w-full text-black py-10 px-4">
            <Footer />
          </footer>
        </>
      )}
    </>
  );
};

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, []);

  const toggleMenu = () => setMenuOpen(prev => !prev);

  return (
    <Router>
      <div className="min-h-screen flex flex-col text-white">
        {/* Navbar stays global */}
        <Navbar toggleMenu={toggleMenu} menuOpen={menuOpen} />

        {/* Main logic inside MainContent */}
        <MainContent />
      </div>
    </Router>
  );
};

export default App;
