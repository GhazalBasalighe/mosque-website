"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface IFormInput {
  username: string;
  password: string;
}

interface ILoginResponse {
  access_token: string;
  userInfo: {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    role: string;
  };
}

export default function LoginPage({
  toggleForm,
}: {
  toggleForm: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const [isPasswordVisible, setPasswordVisible] = useState<boolean>(false);
  const router = useRouter();

  const onSubmit = async (data: IFormInput) => {
    try {
      if (!process.env.NEXT_PUBLIC_SERVICE_URL) return;
      const response = await axios.post<ILoginResponse>(
        process.env.NEXT_PUBLIC_SERVICE_URL + "/auth/login",
        {
          username: data.username,
          password: data.password,
        }
      );
      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("userName", response.data.userInfo.username);
      localStorage.setItem("id", response.data.userInfo.id.toString());
      localStorage.setItem("role", response.data.userInfo.role);
      if (response.status === 200) {
        toast.success("ورود به حساب با موفقیت انجام شد");
        setTimeout(() => {
          if (response.data.userInfo.role === "User") {
            router.push("/user");
          } else {
            router.push("/admin");
          }
        }, 300);
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("نام کاربری یا رمز عبور اشتباه می‌باشد");
    }
  };

  return (
    <>
      <h2 className="text-3xl font-bold text-center text-gray-700">
        ورود به سایت مسجد
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 mt-6"
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
                value.trim() !== "" || "نام کاربری نباید دارای فاصله باشد",
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
                value: 4,
                message: "رمز عبور باید حداقل ۴ کاراکتر باشد",
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

        {/* Submit button */}
        <div className="flex justify-center">
          <Button type="submit" className="w-full">
            ورود
          </Button>
        </div>

        {/* Already have an account? */}
        <div className="flex items-center justify-center gap-2 mt-4 text-sm">
          <span className="text-gray-600">حساب کاربری ندارید؟</span>
          <span
            className="text-teal-600 hover:underline cursor-pointer"
            onClick={toggleForm}
          >
            ایجاد حساب جدید
          </span>
        </div>
      </form>
    </>
  );
}
