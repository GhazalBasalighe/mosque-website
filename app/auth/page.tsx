"use client";
import React, { useState } from "react";
import Image from "next/image";
import LoginPage from "../components/LoginPage/LoginPage";
import SignupPage from "../components/SignupPage/SignupPage";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="relative w-full h-screen">
        {/* Background image */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url('images/pattern-bg.jpg')`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        ></div>

        {/* Green overlay */}
        <div className="absolute inset-0 bg-teal-500 bg-opacity-30"></div>

        <div className="relative flex justify-start items-start h-screen">
          <div className="flex flex-col justify-center shadow-2xl p-8 max-w-lg gap-6 h-full w-full bg-white/30 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10">
            {/* Scrollable form content */}
            <div className="relative w-full h-full overflow-hidden">
              <div
                className={`absolute top-1/4 left-0 w-full h-full transition-transform duration-500 ease-in-out transform ${
                  isLogin ? "translate-x-0" : "-translate-x-full"
                }`}
              >
                <LoginPage toggleForm={toggleForm} />
              </div>

              <div
                className={`absolute top-[10%] left-0 w-full h-full transition-transform duration-500 ease-in-out transform  ${
                  isLogin ? "translate-x-full" : "translate-x-0"
                }`}
              >
                <SignupPage toggleForm={toggleForm} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Image
        src="/images/line-divider.png"
        width={500}
        height={500}
        alt="line divider"
        className="fixed bottom-2 right-1"
      />
    </div>
  );
}
