import React, { useState } from "react";
import { fetchGeminiCropPrices } from "./api";

const MarketPrices = () => {
  const [category, setCategory] = useState("");
  const [prices, setPrices] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showAll, setShowAll] = useState(false);

  const handleFetchPrices = async () => {
    if (!category) {
      setError("Please select a category.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await fetchGeminiCropPrices(category);
      setPrices(result);
    } catch (error) {
      setError("Failed to fetch market prices.");
    } finally {
      setLoading(false);
    }
  };

  const parsePrices = () => {
    if (!prices) return [];

    const lines = prices
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line);

    const crops = [];

    for (let i = 0; i < lines.length; i += 3) {
      const crop = lines[i]?.split(":")[1]?.trim();
      const price = lines[i + 1]?.split(":")[1]?.trim();
      const region = lines[i + 2]?.split(":")[1]?.trim();

      if (crop && price && region) {
        crops.push({ crop, price, region });
      }
    }

    return crops;
  };

  const cropList = parsePrices();
  const visibleCrops = showAll ? cropList : cropList.slice(0, 10);

  return (
    <div className="p-6 bg-green-50 min-h-screen text-green-900">
      <div className="max-w-5xl mx-auto bg-white border border-green-200 shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-green-700 mb-6">
          🌿 Crop Market Prices
        </h1>

        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <select
            className="border border-green-300 p-2 rounded-lg text-sm w-full focus:ring-2 focus:ring-green-400 bg-green-50 text-green-900"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="fruits">Fruits</option>
            <option value="vegetables">Vegetables</option>
            <option value="cereals">Cereals</option>
            <option value="cash crops">Cash Crops</option>
          </select>

          <button
            onClick={handleFetchPrices}
            className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-lg transition w-full sm:w-auto"
            disabled={loading}
          >
            {loading ? "Fetching..." : "Get Prices"}
          </button>
        </div>

        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

        {loading && (
          <div className="text-center mt-4">
            <p className="text-green-500 text-sm">Loading market prices...</p>
          </div>
        )}

        {cropList.length > 0 && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold text-green-700 mb-3">
              📦 Prices for <span className="capitalize">{category}</span>
            </h2>

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-md shadow-sm border border-green-200 text-sm">
                <thead className="bg-green-600 text-white">
                  <tr>
                    <th className="px-4 py-2 text-left">🌾 Crop</th>
                    <th className="px-4 py-2 text-left">💰 Price</th>
                    <th className="px-4 py-2 text-left">📍 Region</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-green-100">
                  {visibleCrops.map((item, index) => (
                    <tr
                      key={index}
                      className="hover:bg-green-50 transition duration-200"
                    >
                      <td className="px-4 py-3">{item.crop}</td>
                      <td className="px-4 py-3">{item.price}</td>
                      <td className="px-4 py-3">{item.region}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-center mt-5">
              <button
                onClick={() => setShowAll((prev) => !prev)}
                className="bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-2 rounded-lg transition"
              >
                {showAll ? "Show Less" : "View More"}
              </button>
            </div>
          </div>
        )}

        {!loading && cropList.length === 0 && (
          <p className="text-center text-gray-500 mt-6 text-sm">
            No crop prices available.
          </p>
        )}
      </div>
    </div>
  );
};

export default MarketPrices;
