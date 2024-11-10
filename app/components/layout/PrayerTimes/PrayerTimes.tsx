"use client";

import { Moon, Sun, Sunset } from "lucide-react";

export default function PrayerTimes() {
  const prayerTimes = [
    {
      name: "اذان صبح",
      time: "۰۵:۱۵ صبح",
      icon: <Sun className="text-yellow-400" />,
    },
    {
      name: "اذان ظهر",
      time: "۱۲:۳۰ ظهر",
      icon: <Sun className="text-orange-500" />,
    },
    {
      name: "اذان عصر",
      time: "۱۶:۰۰ عصر",
      icon: <Sunset className="text-red-500" />,
    },
    {
      name: "اذان مغرب",
      time: "۱۸:۱۰ عصر",
      icon: <Moon className="text-blue-500" />,
    },
    {
      name: "اذان عشا",
      time: "۱۹:۳۰ شب",
      icon: <Moon className="text-indigo-600" />,
    },
  ];

  return (
    <section className="py-12 bg-gray-200 text-gray-900 border-b-2 border-gray-300">
      <div className="container mx-auto px-6 text-center">
        <div className="text-center mt-10 mb-20 relative">
          <h2 className="text-3xl font-bold mb-8">اوقات شرعی</h2>
          <img
            src="/images/frame.svg"
            alt="Decorative Frame"
            className="absolute left-1/2 transform -translate-x-1/2 mb-10"
            style={{ top: -70, width: "600px", height: "170px" }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2">
          {prayerTimes.map((prayer, index) => (
            <div
              key={index}
              className="relative bg-transparent bg-cover bg-no-repeat bg-center p-20 flex flex-col items-center justify-center text-gray-800"
              style={{
                backgroundImage: `url('/images/frame-shape.svg')`,
                backgroundSize: "180px",
              }}
            >
              <div className="mb-2">{prayer.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{prayer.name}</h3>
              <p className="text-gray-500 text-lg font-bold">
                {prayer.time}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}