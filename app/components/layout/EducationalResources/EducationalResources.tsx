"use client";
import Link from "next/link";

export default function EducationalResources() {
  const resources = [
    {
      title: "درس‌های قرآن",
      description: "مجموعه‌ای از درس‌های مفید قرآنی",
      link: "/resources/quran-lessons",
    },
    {
      title: "تاریخ اسلام",
      description: "آموزش تاریخ اسلام و سیره پیامبران",
      link: "/resources/islamic-history",
    },
    {
      title: "معنای نماز",
      description: "یادگیری معنای نماز و اصول عبادت",
      link: "/resources/prayer-meaning",
    },
  ];

  return (
    <section className="py-12 bg-gray-200 text-gray-900 border-b-2 border-gray-300">
      <div className="container mx-auto px-6 text-center">
        <div className="text-center mt-10 mb-20 relative">
          <h2 className="text-3xl font-bold mb-8">منابع آموزشی</h2>
          <img
            src="/images/frame.svg"
            alt="Decorative Frame"
            className="absolute left-1/2 transform -translate-x-1/2 mb-10"
            style={{ top: -70, width: "600px", height: "170px" }}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((resource, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-2">
                {resource.title}
              </h3>
              <p className="text-gray-700 mb-4">{resource.description}</p>
              <Link
                href={resource.link}
                className="text-teal-600 hover:text-teal-700"
              >
                مطالعه بیشتر
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
