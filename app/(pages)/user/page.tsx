"use client";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import { axiosInstance } from "@/app/api/api";

type AccountFormValues = {
  firstName: string;
  lastName: string;
  username: string;
  phoneNumber: string;
};

type UserResponse = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  role: string;
  avatar_path: string;
  created_at: string;
  updated_at: string;
};

function Page() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AccountFormValues>();

  useEffect(() => {
    const userId = localStorage.getItem("id");
    if (userId) {
      axiosInstance
        .get<UserResponse>(`/user/${userId}`)
        .then((response) => {
          const { first_name, last_name, username, phone_number } =
            response.data;
          setValue("firstName", first_name);
          setValue("lastName", last_name);
          setValue("username", username);
          setValue("phoneNumber", phone_number);
        })
        .catch((error) => {
          console.error("Failed to fetch user data", error);
        });
    }
  }, [setValue]);

  const onSubmitAccount: SubmitHandler<AccountFormValues> = (data) => {
    console.log("Account Data:", data);
  };

  return (
    <Tabs defaultValue="account" className="w-full" dir="rtl">
      <TabsList className="flex justify-start space-x-2 p-4 bg-teal-800 h-20 rounded-none">
        <TabsTrigger
          value="account"
          className="px-4 py-2 rounded-md data-[state=active]:bg-teal-500 data-[state=active]:text-white text-gray-200"
        >
          حساب کاربری
        </TabsTrigger>
        <TabsTrigger
          value="reservationManagement"
          className="px-4 py-2 rounded-md data-[state=active]:bg-teal-500 data-[state=active]:text-white text-gray-200"
        >
          مدیریت رزروها
        </TabsTrigger>
      </TabsList>
      <TabsContent
        value="account"
        className="p-6 bg-white dark:bg-gray-800 min-h-[calc(100vh-80px)]"
      >
        <form
          onSubmit={handleSubmit(onSubmitAccount)}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            ویرایش حساب کاربری
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            در این قسمت می‌توانید اطلاعات کاربری خود را ویرایش کنید
          </p>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">نام</Label>
              <Input
                id="firstName"
                {...register("firstName", { required: "نام الزامی است" })}
                className="w-full"
              />
              {errors.firstName && (
                <span className="text-red-500">
                  {errors.firstName.message}
                </span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">نام خانوادگی</Label>
              <Input
                id="lastName"
                {...register("lastName", {
                  required: "نام خانوادگی الزامی است",
                })}
                className="w-full"
              />
              {errors.lastName && (
                <span className="text-red-500">
                  {errors.lastName.message}
                </span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">نام کاربری</Label>
              <Input
                id="username"
                {...register("username", {
                  required: "نام کاربری الزامی است",
                })}
                className="w-full"
              />
              {errors.username && (
                <span className="text-red-500">
                  {errors.username.message}
                </span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">شماره تماس</Label>
              <Input
                id="phoneNumber"
                {...register("phoneNumber", {
                  required: "شماره تماس الزامی است",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "شماره تماس معتبر نیست",
                  },
                })}
                className="w-full"
              />
              {errors.phoneNumber && (
                <span className="text-red-500">
                  {errors.phoneNumber.message}
                </span>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-600 text-white"
            >
              ویرایش و اعمال تغییرات
            </Button>
          </div>
        </form>
      </TabsContent>
      <TabsContent
        value="reservationManagement"
        className="p-6 bg-white dark:bg-gray-800 min-h-[calc(100vh-80px)]"
      ></TabsContent>
    </Tabs>
  );
}

export default Page;
