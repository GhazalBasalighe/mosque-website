"use client";
import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";

interface IFormInput {
  username: string;
  password: string;
}

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit = (data: IFormInput) => {
    console.log("Login data", data);
  };

  return (
    <>
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
          <h2 className="text-3xl font-bold text-center text-gray-700">
            ورود به سایت مسجد
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
            noValidate
          >
            {/* Username field */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="username"
                className="text-base font-medium text-gray-700"
              >
                نام کاربری
              </label>
              <input
                id="username"
                type="text"
                {...register("username", {
                  required: "نام کاربری ضروری است",
                  maxLength: {
                    value: 150,
                    message: "نام کاربری نباید بیشتر از ۱۵۰ کاراکتر باشد",
                  },
                  validate: (value) =>
                    value.trim() !== "" ||
                    "نام کاربری نباید دارای فاصله باشد",
                })}
                className={`block w-full px-3 py-2 rounded-md shadow-sm border focus:outline-none ${
                  errors.username
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-teal-500 focus:border-teal-500"
                }`}
                placeholder="نام کاربری خود را وارد کنید"
              />
              {errors.username && (
                <span className="text-sm text-red-600">
                  {errors.username.message}
                </span>
              )}
            </div>

            {/* Password field */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="password"
                className="text-base font-medium text-gray-700"
              >
                رمز عبور
              </label>
              <input
                id="password"
                type="password"
                {...register("password", {
                  required: "رمز عبور ضروری است",
                  minLength: {
                    value: 6,
                    message: "رمز عبور باید حداقل ۶ کاراکتر باشد",
                  },
                })}
                className={`block w-full px-3 py-2 rounded-md shadow-sm border focus:outline-none ${
                  errors.password
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-teal-500 focus:border-teal-500"
                }`}
                placeholder="رمز عبور خود را وارد کنید"
              />
              {errors.password && (
                <span className="text-sm text-red-600">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Submit button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full bg-teal-600 text-white py-2 px-4 rounded-md shadow hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                ورود
              </button>
            </div>
          </form>

          {/* Already have an account */}
          <div className="text-center mt-4">
            <span className="text-sm text-gray-600">
              حساب کاربری دارید؟{" "}
              <a href="/login" className="text-teal-600 hover:underline">
                ورود به حساب
              </a>
            </span>
          </div>
        </div>
      </div>
      <Image
        src="/images/line-divider.png"
        width={500}
        height={500}
        alt="Picture of the author"
        className="fixed bottom-2 -right-6"
      />
    </>
  );
}
