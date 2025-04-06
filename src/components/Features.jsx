import { useNavigate } from "react-router-dom";
import { FaLeaf, FaBug, FaChartLine, FaCloudSun, FaInfoCircle } from "react-icons/fa";
import { IoWater } from "react-icons/io5";

const features = [
  {
    icon: <FaLeaf size={32} className="text-green-500" />,
    title: "Crop Recommendations",
    description:
      "Get AI-powered recommendations for the best crops to plant based on your soil type, location, and season.",
    link: "/crop",
  },
  {
    icon: <FaBug size={32} className="text-green-500" />,
    title: "Disease Detection",
    description:
      "Upload images of your plants to identify diseases and get treatment recommendations using AI technology.",
    link: "/cropsdisease",
  },
  {
    icon: <FaChartLine size={32} className="text-green-500" />,
    title: "Market Prices",
    description:
      "Stay updated with the latest market prices for various crops across different regions in India.",
    link: "/marketprice",
  },
  {
    icon: <FaCloudSun size={32} className="text-green-500" />,
    title: "Weather Forecast",
    description:
      "Access real-time weather data to plan your agricultural activities and reduce risks.",
    link: "/weather",
  },
  {
    icon: <IoWater size={32} className="text-green-500" />,
    title: "Crop Details",
    description:
      "Get detailed information about specific crops including growth patterns and requirements.",
    link: "/cropstogrow",
  },
  {
    icon: <FaInfoCircle size={32} className="text-green-500" />,
    title: "Chat with FarmBot",
    description:
      "Ask anything related to farming and get intelligent responses from your AI farming assistant.",
    link: "/farmbot",
  },
];

const Features = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-green-50 py-16">
      <div className="max-w-6xl mx-auto  px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-12">
          Smart Farming Features
        </h2>
        <div className="mt-6  grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 cursor-pointer"
              onClick={() => navigate(feature.link)}
            >
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-green-700 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              <span className="text-green-600 font-medium">Learn more →</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
