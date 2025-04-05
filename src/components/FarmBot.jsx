// ... same imports
import React, { useState, useRef, useEffect } from "react";
import {
  FaRobot,
  FaSpinner,
  FaPaperPlane,
  FaVolumeUp,
  FaMicrophone,
  FaStop,
  FaPlay,
  FaPause,
  FaTrash,
} from "react-icons/fa";

const FarmBot = () => {
  const [query, setQuery] = useState("");
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [speaking, setSpeaking] = useState(false);
  const [listening, setListening] = useState(false);
  const [voiceLang, setVoiceLang] = useState("hi-IN");
  const utteranceRef = useRef(null);
  const recognitionRef = useRef(null);

  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const GEMINI_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${API_KEY}`;

  useEffect(() => {
    window.speechSynthesis.getVoices();
    return () => window.speechSynthesis.cancel();
  }, []);

  const cleanMarkdown = (text) => text.replace(/\*+/g, "").trim();

  const handleAskAdvice = async () => {
    if (!query.trim()) return setError("⚠️ Please enter your question.");

    setLoading(true);
    setAdvice("");
    setError("");

    try {
      const body = {
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

      const res = await fetch(GEMINI_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const json = await res.json();
      const rawText =
        json.candidates?.[0]?.content?.parts?.[0]?.text || "❌ No advice found.";
      setAdvice(cleanMarkdown(rawText));
    } catch (err) {
      console.error(err);
      setError("⚠️ Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const speakAdvice = () => {
    if (!advice) return;

    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
      window.speechSynthesis.pause();
      setSpeaking(false);
      return;
    }

    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setSpeaking(true);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(advice);
    utteranceRef.current = utterance;
    const voices = window.speechSynthesis.getVoices();

    const preferredVoice = voices.find(
      (v) => v.lang === voiceLang && v.name.toLowerCase().includes("female")
    );
    const fallbackVoice = voices.find((v) => v.lang === voiceLang);

    if (preferredVoice) utterance.voice = preferredVoice;
    else if (fallbackVoice) utterance.voice = fallbackVoice;

    utterance.lang = voiceLang;

    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => {
      setSpeaking(false);
      setError("🎤 Sorry, couldn’t read it aloud.");
    };

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeech = () => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
  };

  const clearSpeech = () => {
    stopSpeech();
    setAdvice("");
  };

  const handleStartListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("❌ Your browser doesn't support voice input.");
      return;
    }

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.lang = "hi-IN";
    recognitionRef.current.interimResults = false;
    recognitionRef.current.maxAlternatives = 1;

    recognitionRef.current.onstart = () => setListening(true);
    recognitionRef.current.onend = () => setListening(false);
    recognitionRef.current.onerror = (e) => {
      console.error("Voice error:", e.error);
      setError("🎤 Voice input failed. Try again.");
    };

    recognitionRef.current.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQuery((prev) => `${prev} ${transcript}`);
    };

    recognitionRef.current.start();
  };

  return (
    <div className="min-h-screen bg-green-50 px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-10">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center flex items-center justify-center gap-2">
          <div className="text-green-600">
            <FaRobot className="inline" /> Smart FarmBot: Farming Advice
          </div>
        </h2>

        {/* Input Section */}
        <div className="mb-6">
          <div className="relative">
            <textarea
              rows={4}
              placeholder="Ask your farming question... (e.g., What is best crop for black soil in March?)"
              className="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 text-gray-800 text-sm sm:text-base"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            ></textarea>

            <button
              onClick={handleStartListening}
              className="absolute bottom-3 right-3 text-green-600 hover:text-green-800"
              title="Speak your question"
            >
              <FaMicrophone className="text-xl" />
            </button>
          </div>

          {listening && (
            <p className="text-green-700 text-sm mt-2 text-center animate-pulse">
              🎙️ Listening...
            </p>
          )}

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

          {error && (
            <p className="text-red-600 mt-3 text-center text-sm">{error}</p>
          )}
        </div>

        {/* Advice Output Section */}
        {advice && (
          <div className="bg-gray-100 border border-green-300 rounded-md p-4 sm:p-6">
            <div className="flex justify-between items-start mb-3 flex-col sm:flex-row sm:items-center">
              <h2 className="text-lg sm:text-xl font-bold text-black mb-2 sm:mb-0">
                🧠 FarmBot Says:
              </h2>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                <select
                  value={voiceLang}
                  onChange={(e) => setVoiceLang(e.target.value)}
                  className="border border-green-500 rounded px-2 py-1 text-sm text-black bg-white focus:ring-2 focus:ring-green-400"
                >
                  <option value="hi-IN">Hindi Accent</option>
                  <option value="en-IN">English Accent</option>
                </select>
                <button
                  onClick={speakAdvice}
                  className="text-green-700 hover:text-green-900"
                  title={speaking ? "Pause" : "Play"}
                >
                  {speaking ? <FaPause className="text-xl" /> : <FaPlay className="text-xl" />}
                </button>
                <button
                  onClick={stopSpeech}
                  className="text-red-600 hover:text-red-800"
                  title="Stop"
                >
                  <FaStop className="text-xl" />
                </button>
                <button
                  onClick={clearSpeech}
                  className="text-gray-600 hover:text-gray-800"
                  title="Clear"
                >
                  <FaTrash className="text-xl" />
                </button>
              </div>
            </div>
            <div className="whitespace-pre-wrap text-gray-800 text-sm sm:text-base leading-relaxed">
              {advice}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmBot;
