import React, { useState } from "react";
import { FaRobot, FaSpinner, FaPaperPlane } from "react-icons/fa";

const FarmBot = () => {
  const [query, setQuery] = useState("");
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const GEMINI_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${API_KEY}`;

  const handleAskAdvice = async () => {
    if (!query.trim()) return setError("Please enter your question.");

    setLoading(true);
    setAdvice("");
    setError("");

    try {
      const requestBody = {
        contents: [
          {
            parts: [
              {
                text: `Give farming advice in simple Hindi + English mix. Query: "${query}"`,
              },
            ],
          },
        ],
      };

      const response = await fetch(GEMINI_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const result = await response.json();
      const reply =
        result.candidates?.[0]?.content?.parts?.[0]?.text || "No advice found.";
      setAdvice(reply);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 px-4 py-8 sm:p-10">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6 sm:p-8">
        <h1 className="text-3xl sm:text-2xl font-bold text-green-700 mb-6 text-center">
          🌱 Smart FarmBot: Get Farming Advice
        </h1>

        <div className="mb-6">
          <textarea
            rows={4}
            placeholder="Ask your farming question here... (e.g., What is the best crop for clay soil in April?)"
            className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800 text-base"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          ></textarea>

          <button
            onClick={handleAskAdvice}
            disabled={loading}
            className={`mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition flex items-center justify-center gap-2 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? <FaSpinner className="animate-spin" /> : <FaPaperPlane />}
            {loading ? "Getting Advice..." : "Ask FarmBot"}
          </button>

          {error && <p className="text-red-600 mt-3 text-center">{error}</p>}
        </div>

        {advice && (
          <div className="bg-gray-100 border border-green-300 rounded-md p-6">
            <h2 className="text-xl font-bold text-green-800 mb-2">🧠 FarmBot Says:</h2>
            <div className="whitespace-pre-wrap text-gray-800 text-base">{advice}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmBot;
