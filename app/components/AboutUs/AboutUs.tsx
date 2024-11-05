"use client";
import Slider from "react-slick";

export default function AboutUs() {
  const images = [
    "/images/mosque.jpg",
    "/images/mosque1.jpg",
    "/images/mosque2.jpg",
    "/images/mosque3.jpg",
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    rtl: true,
  };
  return (
    <section className="py-12 bg-gray-200 text-gray-900 border-b-2 border-gray-300">
      <div className="container mx-auto px-6 lg:px-12  text-right">
        {/* Section Title */}
        <div className="text-center mb-20 relative">
          <h2 className="text-4xl font-bold mt-10">درباره ما</h2>
          <img
            src="/images/frame.svg"
            alt="Decorative Frame"
            className="absolute left-1/2 transform -translate-x-1/2"
            style={{ top: -40, width: "400px", height: "150px" }}
          />
        </div>

        {/* About Us Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Image Section */}
          <div className="rounded-lg overflow-visible shadow-lg">
            <Slider {...settings}>
              {images.map((src, index) => (
                <div key={index} className="h-100`">
                  <img
                    src={src}
                    alt={`Mosque Image ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </Slider>
          </div>
          {/* Text Content */}
          <div className="flex flex-col gap-6">
            <h3 className="text-2xl max-w-max font-semibold text-teal-600 border-b-2 border-teal-600 pb-2">
              تاریخچه مسجد
            </h3>
            <p className="text-lg leading-relaxed">
              این مسجد در سال‌های ابتدایی به عنوان محلی ساده برای گردهمایی
              و عبادت مسلمانان تأسیس شد و به مرور زمان به مرکز مهمی برای
              برگزاری مراسم دینی، آموزش قرآن، و ترویج ارزش‌های اسلامی در
              جامعه تبدیل گشت. در طول سال‌ها، با مشارکت اعضای جامعه و
              کمک‌های خیریه، ساختمان و امکانات مسجد بهبود یافت و گسترش پیدا
              کرد.
            </p>
            <p className="text-lg leading-relaxed">
              امروزه، مسجد ما به عنوان یک پایگاه اجتماعی، نقش مهمی در زندگی
              روزمره مسلمانان محله ایفا می‌کند. علاوه بر نمازهای روزانه،
              برنامه‌های فرهنگی و آموزشی متعددی در این مسجد برگزار می‌شود
              که از همه سنین و اقشار جامعه استقبال می‌کند.
            </p>

            {/* Reservation Section */}
            <div className="mt-6">
              <h3 className="text-2xl max-w-max font-semibold text-teal-600 border-b-2 border-teal-600 pb-2">
                رزرو مسجد برای مراسم
              </h3>
              <p className="text-gray-700">
                مسجد ما آماده پذیرش رزرو برای مراسم ختم و سوگواری می‌باشد.
                این مکان مقدس با امکانات مناسب و فضای معنوی، به شما کمک
                می‌کند که مراسمی آرام و با احترام برای عزیزان از دست‌رفته
                خود برگزار کنید. جهت هماهنگی بیشتر و رزرو، لطفاً با دفتر
                مسجد تماس بگیرید.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
