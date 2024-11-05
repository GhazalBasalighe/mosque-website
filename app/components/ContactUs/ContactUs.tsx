"use client";

export default function ContactUs() {
  const images = [
    "/images/mosque.jpg",
    "/images/mosque1.jpg",
    "/images/mosque2.jpg",
    "/images/mosque3.jpg",
  ];

  return (
    <section className="py-12 bg-gray-200 text-gray-900 border-b-2 border-gray-300">
      <div className="container mx-auto px-6 lg:px-12  text-right">
        {/* Section Title */}
        <div className="text-center mb-20 relative">
          <h2 className="text-4xl font-bold mt-10">تماس با ما</h2>
          <img
            src="/images/frame.svg"
            alt="Decorative Frame"
            className="absolute left-1/2 transform -translate-x-1/2"
            style={{ top: -40, width: "400px", height: "150px" }}
          />
        </div>

        {/* Contact Us Content */}
        <div className="grid grid-cols-1 gap-10 items-center">
          {/* Text Content */}
          <div className="flex flex-col gap-6">
            <h3 className="text-2xl max-w-max font-semibold text-teal-600 border-b-2 border-teal-600 pb-2">
              دفتر مسجد
            </h3>
            <p className="text-lg leading-relaxed">
              از طریق اطلاعات زیر می‌توانید با مسجد در ارتباط باشید. دفتر
              مسجد همیشه آماده پاسخگویی به پرسش‌های شما در خصوص برنامه‌ها،
              مراسم‌ها و فعالیت‌های مسجد می‌باشد.
            </p>

            {/* Contact Details */}
            <div className="mt-6">
              <h3 className="text-2xl max-w-max font-semibold text-teal-600 border-b-2 border-teal-600 pb-2">
                اطلاعات تماس
              </h3>
              <p className="text-gray-700 my-2">
                آدرس: خیابان اصلی، محله ۱۲، شهر ما
              </p>
              <p className="text-gray-700 mb-2">تلفن: ۰۲۱-۱۲۳۴۵۶۷۸</p>
              <p className="text-gray-700">ایمیل: info@mosque.com</p>
            </div>

            {/* Office Hours */}
            <div className="mt-6">
              <h3 className="text-2xl max-w-max font-semibold text-teal-600 border-b-2 border-teal-600 pb-2">
                ساعات کاری
              </h3>
              <p className="text-gray-700 my-2">
                شنبه تا چهارشنبه: ۸ صبح تا ۶ عصر
              </p>
              <p className="text-gray-700 mb-2">
                پنج‌شنبه: ۸ صبح تا ۴ عصر
              </p>
              <p className="text-gray-700">جمعه‌ها تعطیل</p>
            </div>

            {/* Directions */}
            <div className="mt-6">
              <h3 className="text-2xl max-w-max font-semibold text-teal-600 border-b-2 border-teal-600 pb-2">
                مسیر دسترسی
              </h3>
              <p className="text-gray-700 mt-2">
                برای دسترسی به مسجد می‌توانید از ایستگاه مترو محلی استفاده
                کنید که در نزدیکی مسجد قرار دارد. همچنین پارکینگ عمومی در
                کنار مسجد برای استفاده بازدیدکنندگان فراهم است.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
