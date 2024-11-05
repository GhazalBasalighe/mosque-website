"use client";

export default function CommunityServices() {
  const services = [
    {
      name: "مشاوره خانواده",
      description: "خدمات مشاوره برای خانواده‌ها و افراد.",
    },
    {
      name: "برنامه‌های تغذیه",
      description: "تهیه غذا برای نیازمندان جامعه.",
    },
    { name: "خدمات ازدواج", description: "مشاوره و راهنمایی ازدواج." },
    {
      name: "آموزش اسلامی",
      description: "کلاس‌های آموزشی درباره اسلام و قرآن.",
    },
  ];

  return (
    <section className="py-12 bg-gray-200 text-gray-900 border-b-2 border-gray-300">
      <div className="container mx-auto px-6 text-center">
        <div className="text-center mt-10 mb-20 relative">
          <h2 className="text-3xl font-bold mb-8">خدمات اجتماعی</h2>
          <img
            src="/images/frame.svg"
            alt="Decorative Frame"
            className="absolute left-1/2 transform -translate-x-1/2 mb-10"
            style={{ top: -70, width: "600px", height: "170px" }}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-2">
                {service.name}
              </h3>
              <p className="text-gray-700">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
