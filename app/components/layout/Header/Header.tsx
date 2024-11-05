"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Component() {
  return (
    <header className="bg-teal-800 text-white p-4 pb-10 z-10 shadow-sm sticky">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold ">بسم الله الرحمن الرحيم</div>
          <Link href="/auth">
            <Button variant="outline" size="lg" className="text-white">
              ورود
            </Button>
          </Link>
        </div>
        <nav className="mt-4 absolute top-1/2 right-1/2 translate-x-1/2 p-4 bg-teal-600/30 shadow-sm rounded-lg backdrop-blur-xl  z-20 w-1/3">
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
                href="/articles"
                className="relative pb-2 hover:text-teal-200 transition-colors duration-200 after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[2px] after:bg-teal-200 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
              >
                مقالات
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
