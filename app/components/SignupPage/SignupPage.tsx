"use client";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface IFormInput {
  username: string;
  password: string;
  repeat_password: string;
  last_name: string;
  first_name: string;
  phone_number: string;
}

export default function SignupPage({
  toggleForm,
}: {
  toggleForm: () => void;
}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInput>();

  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isRepeatPasswordVisible, setRepeatPasswordVisible] =
    useState(false);

  const password = watch("password");

  const onSubmit = async (data: IFormInput) => {
    try {
      if (!process.env.NEXT_PUBLIC_SERVICE_URL) return;
      const response = await axios.post(
        process.env.NEXT_PUBLIC_SERVICE_URL + "/auth/signup",
        {
          username: data.username,
          password: data.password,
          last_name: data.last_name,
          repeat_password: data.repeat_password,
          phone_number: data.phone_number,
        }
      );
      console.log(response);
    } catch (error) {
      console.error("Error during signup:", error);
    }
    console.log("Signup data", data);
  };

  return (
    <div className="max-h-screen overflow-y-auto">
      <h2 className="text-3xl font-bold text-center text-gray-700">
        ثبت نام در سایت
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 mt-6 max-h-screen overflow-y-auto"
        noValidate
      >
        <div className="flex items-center gap-4">
          {/* First Name field */}
          <div className="flex flex-col gap-2 w-1/2">
            <label
              htmlFor="first_name"
              className="text-base font-medium text-gray-700"
            >
              نام
            </label>
            <Input
              id="first_name"
              type="text"
              {...register("first_name", {
                required: "نام  ضروری است",
              })}
              className={`${
                errors.first_name
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-400 focus:ring-teal-500 focus:border-teal-500"
              }`}
            />
            {errors.first_name && (
              <span className="text-sm text-red-600">
                {errors.first_name.message}
              </span>
            )}
          </div>
          {/* Last Name field */}
          <div className="flex flex-col gap-2 w-1/2">
            <label
              htmlFor="last_name"
              className="text-base font-medium text-gray-700"
            >
              نام خانوادگی
            </label>
            <Input
              id="last_name"
              type="text"
              {...register("last_name", {
                required: "نام خانوادگی ضروری است",
              })}
              className={`${
                errors.last_name
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-400 focus:ring-teal-500 focus:border-teal-500"
              }`}
            />
            {errors.last_name && (
              <span className="text-sm text-red-600">
                {errors.last_name.message}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4">
          {/* Username field */}
          <div className="flex flex-col gap-2 w-1/2">
            <label
              htmlFor="username"
              className="text-base font-medium text-gray-700"
            >
              نام کاربری
            </label>
            <Input
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
              className={`${
                errors.username
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-400 focus:ring-teal-500 focus:border-teal-500"
              }`}
            />
            {errors.username && (
              <span className="text-sm text-red-600">
                {errors.username.message}
              </span>
            )}
          </div>
          {/* Phone Number field */}
          <div className="flex flex-col gap-2 w-1/2">
            <label
              htmlFor="phone_number"
              className="text-base font-medium text-gray-700"
            >
              شماره تلفن
            </label>
            <Input
              id="phone_number"
              type="text"
              {...register("phone_number", {
                required: "شماره تلفن ضروری است",
                pattern: {
                  value: /^(\\+98|0)?9\d{9}$/,
                  message:
                    "شماره تلفن نامعتبر است. باید به صورت 09xxxxxxxxx باشد.",
                },
              })}
              className={`${
                errors.phone_number
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-400 focus:ring-teal-500 focus:border-teal-500"
              }`}
            />
            {errors.phone_number && (
              <span className="text-sm text-red-600">
                {errors.phone_number.message}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4">
          {/* Password field with visibility toggle */}
          <div className="flex flex-col gap-2 relative">
            <label
              htmlFor="password"
              className="text-base font-medium text-gray-700"
            >
              رمز عبور
            </label>
            <Input
              id="password"
              type={isPasswordVisible ? "text" : "password"}
              {...register("password", {
                required: "رمز عبور ضروری است",
                minLength: {
                  value: 6,
                  message: "رمز عبور باید حداقل ۶ کاراکتر باشد",
                },
              })}
              className={`${
                errors.password
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-400 focus:ring-teal-500 focus:border-teal-500"
              } pl-10`} // Adds padding for the icon
            />
            <button
              type="button"
              className="absolute left-3 top-10 text-gray-600"
              onClick={() => setPasswordVisible(!isPasswordVisible)}
            >
              {isPasswordVisible ? <EyeOff /> : <Eye />}
            </button>
            {errors.password && (
              <span className="text-sm text-red-600">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Repeat Password field with visibility toggle */}
          <div className="flex flex-col gap-2 relative">
            <label
              htmlFor="repeat_password"
              className="text-base font-medium text-gray-700"
            >
              تکرار رمز عبور
            </label>
            <Input
              id="repeat_password"
              type={isRepeatPasswordVisible ? "text" : "password"}
              {...register("repeat_password", {
                required: "تکرار رمز عبور ضروری است",
                validate: (value) =>
                  value === password || "رمز عبور مطابقت ندارد",
              })}
              className={`${
                errors.repeat_password
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-400 focus:ring-teal-500 focus:border-teal-500"
              } pl-10`}
            />
            <button
              type="button"
              className="absolute left-3 top-10 text-gray-600"
              onClick={() =>
                setRepeatPasswordVisible(!isRepeatPasswordVisible)
              }
            >
              {isRepeatPasswordVisible ? <EyeOff /> : <Eye />}
            </button>
            {errors.repeat_password && (
              <span className="text-sm text-red-600">
                {errors.repeat_password.message}
              </span>
            )}
          </div>
        </div>

        {/* Submit button */}
        <div className="flex justify-center">
          <Button type="submit" className="w-full">
            ثبت‌نام
          </Button>
        </div>

        {/* Already have an account? */}
        <div className="flex items-center justify-center gap-2 mt-4 text-sm">
          <span className="text-gray-600">حساب کاربری دارید؟</span>
          <span
            className="text-teal-600 hover:underline cursor-pointer"
            onClick={toggleForm}
          >
            ورود به حساب
          </span>
        </div>
      </form>
    </div>
  );
}
