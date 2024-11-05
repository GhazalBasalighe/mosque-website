"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section
      className="relative h-[70vh] bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: "url('images/pattern-vector-1.svg')",
        backgroundRepeat: "repeat",
        backgroundSize: "contain",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-teal-800/30 backdrop-blur-sm"></div>

      <div className="relative text-center max-w-2xl bg-white/60 backdrop-blur-lg px-4 py-8 rounded-xl">
        <h2 className="text-4xl font-bold text-black mb-8">
          به مسجد خوش آمدید
        </h2>
        <p className="text-lg md:text-xl text-gray-800 mb-6">
          با ما در این خانه مقدس همراه شوید و در جمع معنوی شرکت کنید تا به
          سوی نور و ایمان گام برداریم.
        </p>

        <Link href="/learn-more">
          <Button className="bg-teal-600 hover:bg-teal-700 text-white py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            بیشتر بدانید
          </Button>
        </Link>
      </div>
    </section>
  );
}
