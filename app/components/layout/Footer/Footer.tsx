"use client";
import { convertToPersianDigits } from "@/app/helpers/convertToPersianDigits";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Send,
  Twitter,
} from "lucide-react"; // Importing specific icons from lucide-react
import Link from "next/link";
import { useEffect, useState } from "react";

// Define type for prayer times
interface PrayerTimes {
  Imsaak: string;
  Noon: string;
  Maghreb: string;
  Sunset: string;
}

export default function Footer() {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchPrayerTimes() {
      try {
        const response = await fetch(
          "https://prayer.aviny.com/api/prayertimes/1"
        );
        const jsonResponse = await response.json();

        setPrayerTimes({
          Imsaak: jsonResponse.Imsaak || "نامشخص",
          Noon: jsonResponse.Noon || "نامشخص",
          Maghreb: jsonResponse.Maghreb || "نامشخص",
          Sunset: jsonResponse.Sunset || "نامشخص",
        });
      } catch (error) {
        console.error("Error fetching prayer times:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPrayerTimes();
  }, []);

  return (
    <footer className="bg-teal-900 text-gray-200 py-12">
      <div className="container mx-auto px-6">
        {/* Welcome Message */}
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold mb-3">
            خوش آمدید به خانه خدا
          </h2>
          <p className="text-md max-w-xl mx-auto">
            اینجا مکانی برای آرامش و پیوند معنوی است. در مسجد، فرصتی برای
            بازگشت به ایمان و نزدیکی به پروردگار فراهم شده است. با ما همراه
            شوید تا از برنامه‌های معنوی و آموزشی بهره‌مند شوید.
          </p>
        </div>

        {/* Contact Info and Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-right mb-10">
          {/* Contact Information */}
          <div>
            <h3 className="animated-heading">تماس با ما</h3>
            <div className="flex items-center gap-2 mb-2">
              <MapPin size={20} />
              <p>تهران، خیابان آزادی، کوچه نور</p>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <Phone size={20} />
              <p>تلفن: ۰۲۱-۱۲۳۴۵۶۷۸</p>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={20} />
              <p>ایمیل: info@mosque.com</p>
            </div>
          </div>

          {/* Prayer Times */}
          <div>
            <h3 className="animated-heading">اوقات شرعی</h3>
            {loading ? (
              <p>در حال بارگذاری...</p>
            ) : (
              <div className=" flex flex-col gap-2">
                <p>
                  اذان صبح:{" "}
                  {convertToPersianDigits(
                    prayerTimes?.Imsaak || "00:00:00"
                  )}
                </p>
                <p>
                  اذان ظهر:{" "}
                  {convertToPersianDigits(prayerTimes?.Noon || "00:00:00")}
                </p>
                <p>
                  اذان عصر:{" "}
                  {convertToPersianDigits(
                    prayerTimes?.Sunset || "00:00:00"
                  )}
                </p>
                <p>
                  اذان مغرب:{" "}
                  {convertToPersianDigits(
                    prayerTimes?.Maghreb || "00:00:00"
                  )}
                </p>
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="animated-heading">لینک‌های سریع</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="hover:text-teal-400 transition"
                >
                  درباره مسجد
                </Link>
              </li>
              <li>
                <Link
                  href="/programs"
                  className="hover:text-teal-400 transition"
                >
                  برنامه‌های هفتگی
                </Link>
              </li>
              <li>
                <Link
                  href="/donate"
                  className="hover:text-teal-400 transition"
                >
                  کمک‌های مردمی
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-teal-400 transition"
                >
                  تماس با ما
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="text-center mb-8">
          <h3 className="font-bold">
            ما را در شبکه‌های اجتماعی دنبال کنید
          </h3>
          <div className="flex justify-center gap-4 mt-3">
            <Link
              href="https://facebook.com"
              target="_blank"
              className="text-gray-200 hover:text-teal-400 transition"
            >
              <Facebook size={24} />
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              className="text-gray-200 hover:text-teal-400 transition"
            >
              <Twitter size={24} />
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              className="text-gray-200 hover:text-teal-400 transition"
            >
              <Instagram size={24} />
            </Link>
            <Link
              href="https://telegram.org"
              target="_blank"
              className="text-gray-200 hover:text-teal-400 transition"
            >
              <Send size={24} />
            </Link>
          </div>
        </div>

        {/* Bottom section for copyright */}
        <div className="mt-1 text-center text-sm text-gray-400">
          © ۲۰۲۴ مسجد ما. کلیه حقوق محفوظ است.
        </div>
      </div>
    </footer>
  );
}
