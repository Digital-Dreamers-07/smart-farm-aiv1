const reviews = [
    {
      name: "Ajeet Kumar",
      role: "Wheat Farmer, Punjab",
      feedback:
        "The crop recommendations helped me increase my wheat yield by 30% this season. The disease detection feature saved my crops from a potential pest infestation.",
    },
    {
      name: "Lakshmi Devi",
      role: "Rice Farmer, Tamil Nadu",
      feedback:
        "The market price tracker helps me decide when to sell my produce for maximum profit. I check the weather forecast daily to plan my irrigation schedule.",
    },
    {
      name: "Anil Patel",
      role: "Cotton Farmer, Gujarat",
      feedback:
        "The detailed crop information helped me diversify my farm with new high-value crops. The soil recommendations were spot on for my region.",
    },
  ];
  
  const Reviews = () => {
    return (
      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-12">
            Trusted by Farmers Across India
          </h2>
  
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, idx) => (
              <div
                key={idx}
                className="bg-white shadow-md rounded-2xl p-6 text-left border border-green-100 hover:shadow-lg transition"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-10 w-10 rounded-full bg-green-200"></div>
                  <div>
                    <p className="font-semibold text-sm text-gray-900">{review.name}</p>
                    <p className="text-xs text-gray-500">{review.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">"{review.feedback}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default Reviews;
  