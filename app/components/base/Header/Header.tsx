"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Component() {
  return (
    <header className="bg-teal-800 text-white p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold font-arabic">
            بسم الله الرحمن الرحيم
          </div>
          <Button variant="outline" size="lg" className="text-white">
            ورود
          </Button>
        </div>
        <nav className="mt-4">
          <ul className="flex space-x-4 justify-center gap-4">
            <li>
              <Link
                href="/news"
                className="hover:text-teal-200 transition-colors duration-200"
              >
                رویدادها
              </Link>
            </li>
            <li>
              <Link
                href="/articles"
                className="hover:text-teal-200 transition-colors duration-200"
              >
                مقالات
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-teal-200 transition-colors duration-200"
              >
                درباره ما
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-teal-200 transition-colors duration-200"
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
