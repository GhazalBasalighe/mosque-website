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
import { Card } from "@/components/ui/card";

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
    getValues,
    formState: { errors },
  } = useForm<AccountFormValues>();
  const [preview, setPreview] = useState<string | null>(null);
  const [defaultValues, setDefaultValues] =
    useState<AccountFormValues | null>(null);

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
          const initialValues = {
            firstName: first_name,
            lastName: last_name,
            username: username,
            phoneNumber: phone_number,
            avatar: avatar_path,
          };
          setDefaultValues(initialValues);
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
    if (userId && defaultValues) {
      try {
        const updatedData: Partial<UserResponse> = {};
        const currentValues = getValues();

        if (currentValues.firstName !== defaultValues.firstName) {
          updatedData.first_name = currentValues.firstName;
        }
        if (currentValues.lastName !== defaultValues.lastName) {
          updatedData.last_name = currentValues.lastName;
        }
        if (currentValues.username !== defaultValues.username) {
          updatedData.username = currentValues.username;
        }
        if (currentValues.phoneNumber !== defaultValues.phoneNumber) {
          updatedData.phone_number = currentValues.phoneNumber;
        }

        if (Object.keys(updatedData).length > 0) {
          await axiosInstance.put(`/user/${userId}`, updatedData);
          toast.success("ویرایش کاربر با موفقیت صورت گرفت");
        } else {
          toast("هیچ تغییری اعمال نشد");
        }
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
        className="p-6 flex justify-center items-center bg-teal-100 mt-0"
      >
        <Card className="w-full max-w-3xl ml-auto p-6 bg-white relative z-10 shadow-xl rounded-lg">
          <form
            onSubmit={handleSubmit(onSubmitAccount)}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 ">
              ویرایش حساب کاربری
            </h2>
            <p className="text-gray-600">
              در این قسمت می‌توانید اطلاعات کاربری خود را ویرایش کنید
            </p>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="avatar">تصویر پروفایل</Label>
                <Avatar
                  width={300}
                  height={100}
                  src={preview || undefined}
                  label="انتخاب کنید"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="firstName">نام</Label>
                <Input
                  id="firstName"
                  {...register("firstName", {
                    required: "نام الزامی است",
                  })}
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
                className="w-1/3 ml-0 bg-teal-600 hover:bg-teal-700 text-white rounded-md"
              >
                ویرایش و اعمال تغییرات
              </Button>
            </div>
          </form>
        </Card>
      </TabsContent>
      <TabsContent
        value="reservationManagement"
        className="p-6 bg-white dark:bg-gray-800 min-h-[calc(100vh-80px)]"
      ></TabsContent>
    </Tabs>
  );
}

export default Page;
