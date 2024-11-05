"use client";
import Link from "next/link";

export default function NewsSection() {
  const newsItems = [
    {
      id: 1,
      title: "برگزاری جشن میلاد پیامبر",
      date: "۱۲ آبان ۱۴۰۲",
      img: "/images/news/jashn-milad.jpg",
      excerpt:
        "به مناسبت میلاد پیامبر اکرم (ص)، مراسم ویژه‌ای با حضور علما و مداحان محترم برگزار می‌شود. این جشن به منظور بزرگداشت میلاد حضرت محمد (ص) و ترویج آموزه‌های ایشان در جامعه اسلامی ترتیب داده شده است و شامل برنامه‌های متنوعی از جمله سخنرانی، شعرخوانی و پخش نذورات می‌باشد. همه علاقه‌مندان دعوت شده‌اند.",
    },
    {
      id: 2,
      title: "کلاس‌های آموزشی قرآن کریم",
      date: "۲۰ آبان ۱۴۰۲",
      img: "/images/news/kelas-quran.jfif",
      excerpt:
        "مسجد برنامه‌هایی برای آموزش قرآن و درک بهتر مفاهیم آن برگزار می‌کند. در این کلاس‌ها تلاوت قرآن، تفسیر آیات و احادیث مرتبط آموزش داده می‌شود و مربیان مجرب این جلسات را هدایت می‌کنند. علاقه‌مندان از تمامی سطوح می‌توانند شرکت کنند تا با آموزه‌های اسلامی بیشتر آشنا شوند و درک عمیق‌تری از کتاب مقدس قرآن پیدا کنند.",
    },
    {
      id: 3,
      title: "یادواره شهدای محله",
      date: "۲۸ آبان ۱۴۰۲",
      img: "/images/news/yadvare.jpg",
      excerpt:
        "یادواره‌ای برای شهدای محله برگزار می‌شود تا یاد و خاطره آن‌ها گرامی داشته شود. در این مراسم، سخنرانی‌هایی در خصوص ایثار و فداکاری شهدا ارائه خواهد شد و خانواده‌های آن‌ها نیز دعوت شده‌اند. همچنین، فضای معنوی مراسم با قرائت قرآن و پخش سرودهای ملی و مذهبی همراه خواهد بود و فرصتی برای تجدید عهد با آرمان‌های شهدا فراهم می‌شود.",
    },
  ];

  return (
    <section className="py-12 bg-gray-200 text-gray-900 border-b-2 border-gray-300">
      <div className="container mx-auto px-6">
        {/* Section Title with Decorative Frame */}
        <div className="text-center mt-10 mb-20 relative">
          <h2 className="text-3xl font-bold">اخبار و رویدادهای مسجد</h2>
          <img
            src="/images/frame.svg"
            alt="Decorative Frame"
            className="absolute left-1/2 transform -translate-x-1/2 mb-10"
            style={{ top: -70, width: "600px", height: "170px" }}
          />
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item) => (
            <div
              key={item.id}
              className="relative bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 duration-300 hover:shadow-2xl"
            >
              {/* News Image with Overlay */}
              <div className="relative h-48 overflow-hidden rounded-t-lg">
                <img
                  src={item.img}
                  alt={item.title}
                  className="object-cover w-full h-full transition-transform duration-200 transform "
                />
              </div>

              {/* News Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">{item.date}</p>
                <p className="text-gray-700 mb-4 line-clamp-2">
                  {item.excerpt}
                </p>
                <Link
                  href={`/news/${item.id}`}
                  className="text-teal-600 hover:text-teal-700 transition-colors"
                >
                  ادامه مطلب
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All News Button */}
        <div className="text-center mt-8">
          <Link href="/news">
            <button className="bg-teal-600 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-teal-700 transition-colors">
              مشاهده تمامی اخبار
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
