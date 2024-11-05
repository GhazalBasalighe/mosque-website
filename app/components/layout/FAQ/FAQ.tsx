"use client";
import { useState } from "react";

export default function FAQ() {
  const faqs = [
    {
      question: "چگونه می‌توانم در مسجد ثبت‌نام کنم؟",
      answer:
        "برای ثبت‌نام، به صفحه ثبت‌نام مراجعه کنید و فرم مربوطه را پر کنید.",
    },
    {
      question: "آیا برنامه‌های آموزشی رایگان هستند؟",
      answer:
        "بله، اکثر برنامه‌های آموزشی رایگان هستند، اما برای برخی از برنامه‌های خاص هزینه کمی دریافت می‌شود.",
    },
    {
      question: "چگونه می‌توانم در فعالیت‌های خیریه شرکت کنم؟",
      answer:
        "برای شرکت در فعالیت‌های خیریه، با مدیریت مسجد تماس بگیرید یا به صفحه داوطلبی مراجعه کنید.",
    },
  ];

  return (
    <section className="py-12 bg-gray-200 text-gray-900 border-b-2 border-gray-300">
      <div className="container mx-auto px-6">
        <div className="text-center mt-10 mb-20 relative">
          <h2 className="text-3xl font-bold mb-8 text-center">
            سوالات متداول
          </h2>{" "}
          <img
            src="/images/frame.svg"
            alt="Decorative Frame"
            className="absolute left-1/2 transform -translate-x-1/2 mb-10"
            style={{ top: -70, width: "600px", height: "170px" }}
          />
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const [isOpen, setIsOpen] = useState(false);

            return (
              <div
                key={index}
                onClick={() => setIsOpen(!isOpen)}
                className="bg-white p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold text-teal-600">
                  {faq.question}
                </h3>
                {isOpen && (
                  <p className="text-gray-700 mt-2">{faq.answer}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
