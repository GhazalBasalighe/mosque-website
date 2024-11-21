"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "../../AdminDashboard/UserAvatar/UserAvatar";
import { axiosInstance } from "@/app/api/api";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [profilePhoto, setProfilePhoto] = useState<string>("");
  const [hasLoggedOut, setHasLoggedOut] = useState<boolean>(false);

  const getProfilePhoto = async () => {
    const userId = localStorage.getItem("id");
    if (userId) {
      try {
        const response = await axiosInstance.get(
          `/user/avatar/${userId}`,
          {
            responseType: "blob",
          }
        );
        const imageUrl = URL.createObjectURL(response.data);
        setProfilePhoto(imageUrl);
      } catch (error) {
        console.error("Error fetching profile photo", error);
        setProfilePhoto("/images/default-pfp.webp");
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    getProfilePhoto();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`p-4 pb-10 z-10 sticky top-0 transition-all duration-300 ${
        isScrolled ? "bg-teal-600 shadow-md" : "bg-teal-700 shadow-sm"
      }`}
    >
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-4">
            <img
              src="/images/logo.png"
              alt="profile"
              className="rounded-full w-14 h-14"
            />
            <div className="text-2xl font-bold">
              بسم الله الرحمن الرحيم
            </div>
          </Link>
          {localStorage.getItem("token") &&
          localStorage.getItem("userName") ? (
            <UserAvatar
              profilePhoto={profilePhoto}
              username={localStorage.getItem("userName")}
              hasLoggedOut={hasLoggedOut}
              setHasLoggedOut={setHasLoggedOut}
            />
          ) : (
            <Link href="/auth">
              <Button variant="outline" size="lg" className="text-white">
                ورود / ثبت نام
              </Button>
            </Link>
          )}
        </div>
        <nav
          className={`mt-4 absolute top-1/2 right-1/2 translate-x-1/2 p-4 shadow-sm rounded-lg backdrop-blur-xl z-20 w-1/3 ${
            isScrolled ? "bg-teal-400/50" : "bg-teal-600/30"
          }`}
        >
          <ul className="flex space-x-4 justify-center gap-4">
            <li>
              <Link
                href="/news"
                className="relative pb-2 hover:text-teal-200 transition-colors duration-200 after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[2px] after:bg-teal-200 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
              >
                رویدادها
              </Link>
            </li>

            <li>
              <Link
                href="/about"
                className="relative pb-2 hover:text-teal-200 transition-colors duration-200 after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[2px] after:bg-teal-200 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
              >
                درباره ما
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="relative pb-2 hover:text-teal-200 transition-colors duration-200 after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[2px] after:bg-teal-200 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
              >
                تماس با ما
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
