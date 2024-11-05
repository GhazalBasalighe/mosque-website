"use client";
import Link from "next/link";

export default function EducationalResources() {
  const resources = [
    {
      title: "درس‌های قرآن",
      description:
        "مجموعه‌ای از درس‌های مفید قرآنی که به شما کمک می‌کند اصول و مفاهیم مهم قرآن کریم را بهتر درک کنید و به زندگی روزمره خود اعمال کنید. این مجموعه شامل تفسیر آیات و داستان‌های قرآنی است که برای همه سنین مناسب است.",
      link: "/educational/quran-lessons",
      img: "/images/educational/quran.jfif",
    },
    {
      title: "تاریخ اسلام",
      description:
        "آموزش تاریخ اسلام و سیره پیامبران از آغاز تا عصر حاضر. این درس‌ها شما را با زندگی پیامبران، فراز و نشیب‌های تاریخ اسلام و فرهنگ اسلامی آشنا می‌کند. با یادگیری این مطالب می‌توانید درک بهتری از ارزش‌های اسلامی و تاریخ این دین بزرگ داشته باشید.",
      link: "/educational/islamic-history",
      img: "/images/educational/history.jpg",
    },
    {
      title: "معنای نماز",
      description:
        "یادگیری معنای نماز و اصول عبادت برای ایجاد پیوندی نزدیکتر با خداوند. این دوره شامل آموزش مفاهیم عمیق نماز و چگونگی تمرکز در هنگام ادای آن است. علاوه بر این، تکنیک‌هایی برای افزایش خلوص در نماز ارائه می‌شود که به شما کمک می‌کند در ارتباط خود با پروردگار ثابت‌قدم‌تر باشید.",
      link: "/educational/prayer-meaning",
      img: "/images/educational/prayer.jpg",
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
              className="relative bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg"
            >
              {/* Resource Image with Overlay */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={resource.img}
                  alt={resource.title}
                  className="object-cover w-full h-full transition-transform duration-200 transform"
                />
                <div className="absolute grid place-items-center p-4 inset-0 bg-white/30 backdrop-blur-md opacity-0 hover:opacity-100 transition-opacity duration-300">
                  {resource.description}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 transition-all duration-300">
                <h3 className="text-xl font-semibold mb-2">
                  {resource.title}
                </h3>
                <p className="text-gray-700 mb-4 line-clamp-2 ">
                  {resource.description}
                </p>
                <Link
                  href={resource.link}
                  className="text-teal-600 hover:text-teal-700"
                >
                  مطالعه بیشتر
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
