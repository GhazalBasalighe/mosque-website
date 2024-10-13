"use client";
import { useForm } from "react-hook-form";

interface IFormInput {
  username: string;
  first_name: string;
  last_name: string;
  password: string;
  repeat_password: string;
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
    formState: { errors },
    watch,
  } = useForm<IFormInput>();

  const onSubmit = (data: IFormInput) => {
    console.log("Signup data", data);
  };

  const password = watch("password");

  return (
    <>
      <h2 className="text-3xl font-bold text-center text-gray-700">
        ثبت‌نام در سایت مسجد
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 py-10"
        noValidate
      >
        <div className="flex gap-2 items-cetner">
          {/* First name field */}
          <div className="flex flex-col gap-2 w-1/3">
            <label
              htmlFor="first_name"
              className="text-base font-medium text-gray-700"
            >
              نام
            </label>
            <input
              id="first_name"
              type="text"
              {...register("first_name", {
                required: "نام ضروری است",
                maxLength: {
                  value: 255,
                  message: "نام نباید بیشتر از ۲۵۵ کاراکتر باشد",
                },
              })}
              className={`block w-full px-3 py-2 rounded-md shadow-sm border focus:outline-none ${
                errors.first_name
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:ring-teal-500 focus:border-teal-500"
              }`}
            />
            {errors.first_name && (
              <span className="text-sm text-red-600">
                {errors.first_name.message}
              </span>
            )}
          </div>
          {/* Last name field */}
          <div className="flex flex-col gap-2 w-2/3">
            <label
              htmlFor="last_name"
              className="text-base font-medium text-gray-700"
            >
              نام خانوادگی
            </label>
            <input
              id="last_name"
              type="text"
              {...register("last_name", {
                required: "نام خانوادگی ضروری است",
                maxLength: {
                  value: 255,
                  message: "نام خانوادگی نباید بیشتر از ۲۵۵ کاراکتر باشد",
                },
              })}
              className={`block w-full px-3 py-2 rounded-md shadow-sm border focus:outline-none ${
                errors.last_name
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:ring-teal-500 focus:border-teal-500"
              }`}
            />
            {errors.last_name && (
              <span className="text-sm text-red-600">
                {errors.last_name.message}
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-2 items-cetner">
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
              })}
              className={`block w-full px-3 py-2 rounded-md shadow-sm border focus:outline-none ${
                errors.username
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:ring-teal-500 focus:border-teal-500"
              }`}
            />
            {errors.username && (
              <span className="text-sm text-red-600">
                {errors.username.message}
              </span>
            )}
          </div>
          {/* Phone Number field */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="phone_number"
              className="text-base font-medium text-gray-700"
            >
              شماره تلفن
            </label>
            <input
              id="phone_number"
              type="tel"
              {...register("phone_number", {
                required: "شماره تلفن ضروری است",
                pattern: {
                  value: /^(\\+98|0)?9\\d{9}$/,
                  message: "شماره تلفن معتبر وارد کنید",
                },
              })}
              className={`block w-full px-3 py-2 rounded-md shadow-sm border focus:outline-none ${
                errors.phone_number
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:ring-teal-500 focus:border-teal-500"
              }`}
            />
            {errors.phone_number && (
              <span className="text-sm text-red-600">
                {errors.phone_number.message}
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-2 items-cetner">
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
                  value: 8,
                  message: "رمز عبور باید حداقل ۸ کاراکتر باشد",
                },
                maxLength: {
                  value: 255,
                  message: "رمز عبور نباید بیشتر از ۲۵۵ کاراکتر باشد",
                },
                pattern: {
                  value: /^(?=.*[a-zA-Z])(?=.*\d)/,
                  message: "رمز عبور باید شامل حروف و اعداد باشد",
                },
              })}
              className={`block w-full px-3 py-2 rounded-md shadow-sm border focus:outline-none ${
                errors.password
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:ring-teal-500 focus:border-teal-500"
              }`}
            />
            {errors.password && (
              <span className="text-sm text-red-600">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Repeat Password field */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="repeat_password"
              className="text-base font-medium text-gray-700"
            >
              تکرار رمز عبور
            </label>
            <input
              id="repeat_password"
              type="password"
              {...register("repeat_password", {
                required: "تکرار رمز عبور ضروری است",
                validate: (value) =>
                  value === password || "رمز عبور مطابقت ندارد",
              })}
              className={`block w-full px-3 py-2 rounded-md shadow-sm border focus:outline-none ${
                errors.repeat_password
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:ring-teal-500 focus:border-teal-500"
              }`}
            />
            {errors.repeat_password && (
              <span className="text-sm text-red-600">
                {errors.repeat_password.message}
              </span>
            )}
          </div>
        </div>
        {/* Submit button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 px-4 rounded-md shadow hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            ثبت‌نام
          </button>
        </div>
        {/* Already have an account? */}
        <div className="flex items-center justify-center gap-2 mt-4 text-sm">
          <span className="text-gray-600">حساب کاربری دارید؟</span>
          <span
            className="text-teal-600 hover:underline"
            onClick={toggleForm}
          >
            ورود به حساب
          </span>
        </div>
      </form>
    </>
  );
}
