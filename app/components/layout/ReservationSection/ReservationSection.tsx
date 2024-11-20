"use client";
import Link from "next/link";

export default function ReservationSection() {
  return (
    <section className="py-12 bg-gray-200 text-gray-900 border-b-2 border-gray-300">
      <div className="container mx-auto px-6">
        {/* Section Title with Decorative Frame */}
        <div className="text-center mt-10 mb-20 relative">
          <h2 className="text-3xl font-bold">رزرو مسجد</h2>
          <img
            src="/images/frame.svg"
            alt="Decorative Frame"
            className="absolute left-1/2 transform -translate-x-1/2 mb-10"
            style={{ top: -70, width: "600px", height: "170px" }}
          />
        </div>

        {/* Reservation Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md mx-auto">
          <h3 className="text-2xl font-semibold text-center mb-6 text-gray-800">
            رزرو فضای مراسم
          </h3>

          {/* Login Prompt */}
          <p className="text-sm text-gray-600 text-center mb-8">
            برای رزرو مسجد ابتدا باید وارد حساب کاربری خود شوید
          </p>

          {/* Reservation Button */}
          <div className="text-center">
            <Link href="/auth">
              <button className="bg-teal-600 text-white py-3 px-8 rounded-lg shadow-lg hover:bg-teal-700 transition-all">
                ورود و رزرو مسجد
              </button>
            </Link>
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>
              برای اطلاعات بیشتر درباره شرایط و ضوابط رزرو، لطفاً با مدیریت
              مسجد تماس بگیرید.
            </p>
            <p>شماره تماس: ۰۲۱-۱۲۳۴۵۶۷۸</p>
          </div>
        </div>
      </div>
    </section>
  );
}
