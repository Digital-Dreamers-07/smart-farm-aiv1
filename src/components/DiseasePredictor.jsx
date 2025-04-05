import React, { useState } from "react";
import { FaUpload, FaSpinner } from "react-icons/fa";

const DiseasePredictor = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [mainDisease, setMainDisease] = useState("");
  const [report, setReport] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY; 
  const GEMINI_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${API_KEY}`;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return setError("Please select a valid image.");

    const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    if (!validTypes.includes(file.type)) return setError("Invalid file type. Please upload JPEG/PNG/WEBP.");

    if (file.size > 5 * 1024 * 1024) return setError("File size exceeds 5MB. Please upload a smaller image.");

    setSelectedFile(file);
    setError("");
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });

  const extractMainDisease = (text) => {
    const patterns = [
      /alternaria leaf spot/i,
      /cercospora leaf spot/i,
      /septoria leaf spot/i,
      /powdery mildew/i,
      /downy mildew/i,
      /bacterial leaf spot/i,
      /anthracnose/i,
      /fusarium wilt/i,
      /rust/i,
      /blight/i,
      /root rot/i,
    ];
    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) return match[0];
    }
    return "Unknown Disease";
  };

  const formatReport = (text) => {
    return text
      .replace(/\*/g, "")
      .replace(/-/g, "")
      .replace(/•/g, "")
      .replace(/\n+/g, "\n")
      .replace(/\s{2,}/g, " ")
      .trim();
  };

  const handleUpload = async () => {
    if (!selectedFile) return setError("Please select an image.");
    setLoading(true);
    setMainDisease("");
    setReport("");
    setError("");

    try {
      const base64Image = await toBase64(selectedFile);

      const requestBody = {
        contents: [
          {
            parts: [
              {
                inlineData: {
                  mimeType: selectedFile.type,
                  data: base64Image,
                },
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

      if (!response.ok) throw new Error(`API failed: ${response.status}`);
      const result = await response.json();
      const rawText = result.candidates?.[0]?.content?.parts?.[0]?.text || "No data received";

      setMainDisease(extractMainDisease(rawText));
      setReport(formatReport(rawText));
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to analyze image. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:p-10">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-green-700">
          🌾 Crop Disease Detection with Styled Report
        </h1>

        <div className="text-center mb-6">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full max-w-sm mx-auto text-sm text-gray-600 mb-4"
          />

          {selectedFile && (
            <div className="mt-4 flex justify-center">
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="Selected"
                className="w-full max-w-xs h-auto object-cover rounded-lg border"
              />
            </div>
          )}

          <button
            onClick={handleUpload}
            className={`mt-6 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition flex items-center justify-center gap-2 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? <FaSpinner className="animate-spin" /> : <FaUpload />}
            {loading ? "Analyzing..." : "Upload & Detect"}
          </button>

          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>

        {loading && (
          <div className="text-center mt-6">
            <FaSpinner className="animate-spin text-green-500 text-4xl mx-auto" />
            <p className="mt-2 text-gray-700">Analyzing image...</p>
          </div>
        )}

        {mainDisease && (
          <div className="bg-green-100 rounded-lg shadow-lg p-6 mt-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-black">
              🌿 Main Disease Detected:{" "}
              <span className="font-semibold">{mainDisease}</span>
            </h3>
          </div>
        )}

        {report && (
          <div className="bg-gray-100 rounded-lg shadow-lg p-6 mt-6">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">📄 Diagnostic Report</h3>
            <div className="text-base sm:text-lg text-gray-700 whitespace-pre-wrap">
              {report}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiseasePredictor;
