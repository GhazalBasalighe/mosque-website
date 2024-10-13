"use client";
import React, { useState } from "react";
import LoginPage from "../login/page";
import SignupPage from "../signup/page";
import Image from "next/image";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Image
        src="/images/line-divider.png"
        width={500}
        height={500}
        alt="line divider"
        className="fixed top-2 -right-6"
      />
      <div
        className="flex justify-start items-start h-screen bg-green-100"
        style={{
          backgroundImage: `url('images/mosque-line-art.png')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundPosition: "25% 90%",
        }}
      >
        <div className="flex flex-col justify-center shadow-2xl rounded-lg p-8 w-full max-w-md h-full bg-green-200 gap-6">
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
      <Image
        src="/images/line-divider.png"
        width={500}
        height={500}
        alt="line divider"
        className="fixed bottom-2 -right-6"
      />
    </div>
  );
}
