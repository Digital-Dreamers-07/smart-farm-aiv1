import { Link } from "react-router-dom";

const Mission = () => {
  return (
    <section className="bg-green-800 text-white w-full py-20 flex items-center justify-center text-center px-6">
      <div className="max-w-3xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ready to Transform Your Farming?
        </h2>
        <p className="text-lg md:text-xl mb-8">
          Join thousands of farmers using our AI-powered platform to increase yields and maximize profits.
        </p>
        <Link
          to="/crop"
          style={{ textDecoration: "none",color:'green' }}
          className="inline-block bg-white text-green-800 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-green-100 transition"
        >
          Get Started Now
        </Link>
      </div>
    </section>
  );
};

export default Mission;
