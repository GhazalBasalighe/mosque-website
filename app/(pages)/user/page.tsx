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
import { useEffect, useState } from "react";
import { axiosInstance } from "@/app/api/api";
import toast from "react-hot-toast";
import Avatar from "react-avatar-edit";

type AccountFormValues = {
  firstName: string;
  lastName: string;
  username: string;
  phoneNumber: string;
  avatar: string;
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
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    const userId = localStorage.getItem("id");
    if (userId) {
      (async () => {
        try {
          const response = await axiosInstance.get<UserResponse>(
            `/user/${userId}`
          );
          const {
            first_name,
            last_name,
            username,
            phone_number,
            avatar_path,
          } = response.data;
          setValue("firstName", first_name);
          setValue("lastName", last_name);
          setValue("username", username);
          setValue("phoneNumber", phone_number);
          setPreview(avatar_path);
        } catch (error) {
          console.error("Failed to fetch user data", error);
          toast.error("خطایی در بارگزاری اولیه مقادیر به وجود آمد");
        }
      })();
    }
  }, [setValue]);

  const onSubmitAccount: SubmitHandler<AccountFormValues> = async (
    data
  ) => {
    const userId = localStorage.getItem("id");
    if (userId) {
      try {
        await axiosInstance.put(`/user/${userId}`, {
          first_name: data.firstName,
          last_name: data.lastName,
          username: data.username,
          phone_number: data.phoneNumber,
          avatar_path: preview,
        });
        toast.success("ویرایش کاربر با موفقیت صورت گرفت");
      } catch (error) {
        console.error("Failed to update user data", error);
        toast.error("ویرایش اطلاعات با خطا مواجه شد");
      }
    }
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
              <Label htmlFor="avatar">تصویر پروفایل</Label>
              <Avatar
                width={390}
                height={295}
                src={preview || undefined}
              />
            </div>
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
