"use client";
import { axiosInstance } from "@/app/api/api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Avatar from "react-avatar-edit";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { TabsNavigation } from "./TabsNavigation/TabsNavigation";
import { UserAvatar } from "./UserAvatar/UserAvatar";
import { UserList } from "./UserList/UserList";

type AccountFormValues = {
  firstName: string;
  lastName: string;
  username: string;
  phoneNumber: string;
};

export type UserResponse = {
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

type UsersListResponse = {
  total: number;
  page: number;
  data: UserResponse[];
};

function AdminDashboard() {
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
  const [avatarFile, setAvatarFile] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [profilePhoto, setProfilePhoto] = useState<string>(
    "/images/default-pfp.webp"
  );
  const [users, setUsers] = useState<UserResponse[]>([]);
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem("id");
    if (userId) {
      (async () => {
        try {
          const response = await axiosInstance.get<UserResponse>(
            `/user/${userId}`
          );
          const { first_name, last_name, username, phone_number } =
            response.data;
          const initialValues = {
            firstName: first_name,
            lastName: last_name,
            username: username,
            phoneNumber: phone_number,
          };
          setDefaultValues(initialValues);
          setValue("firstName", first_name);
          setValue("lastName", last_name);
          setValue("username", username);
          setValue("phoneNumber", phone_number);
          setUsername(username);
        } catch (error) {
          console.error("Failed to fetch user data", error);
          toast.error("خطایی در بارگزاری اولیه مقادیر به وجود آمد");
        }
      })();
    }
  }, [setValue]);

  useEffect(() => {
    getProfilePhoto();
    fetchUsers();
  }, []);

  const getProfilePhoto = async () => {
    const userId = localStorage.getItem("id");
    if (userId) {
      try {
        const response = await axiosInstance.get(
          `/user/avatar/${userId}`,
          {
            responseType: "blob",
          }
        );
        const imageUrl = URL.createObjectURL(response.data);
        setProfilePhoto(imageUrl);
      } catch (error) {
        console.error("Error fetching profile photo", error);
        setProfilePhoto("/images/default-pfp.webp");
      }
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get<UsersListResponse>("/user");
      setUsers(response.data.data);
    } catch (error) {
      console.error("Failed to fetch users", error);
      toast.error("بارگزاری لیست کاربران با خطا مواجه شد");
    }
  };

  const uploadAvatar = async (userId: string, avatarData: string) => {
    try {
      const base64Response = await fetch(avatarData);
      const blob = await base64Response.blob();

      const formData = new FormData();
      formData.append("avatar", blob, "avatar.png");

      await axiosInstance.patch(
        `/user/update-avatar/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("تصویر پروفایل با موفقیت بروزرسانی شد");
    } catch (error) {
      console.error("Failed to upload avatar", error);
      toast.error("آپلود تصویر پروفایل با خطا مواجه شد");
    }
  };

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

        // Handle profile updates
        if (Object.keys(updatedData).length > 0) {
          await axiosInstance.put(`/user/${userId}`, updatedData);
          toast.success("ویرایش کاربر با موفقیت صورت گرفت");
        }

        // Handle avatar upload if there's a new avatar
        if (avatarFile) {
          await uploadAvatar(userId, avatarFile);
        }

        if (Object.keys(updatedData).length === 0 && !avatarFile) {
          toast("هیچ تغییری اعمال نشد");
        }
      } catch (error) {
        console.error("Failed to update user data", error);
        toast.error("ویرایش اطلاعات با خطا مواجه شد");
      }
    }
  };

  const logout = () => {
    localStorage.clear();
    toast.success("خروج با موفقیت انجام شد");
    router.replace("/auth");
  };

  return (
    <Tabs defaultValue="account" className="w-full" dir="rtl">
      <div className="flex items-center justify-between p-4 bg-teal-800 h-20 rounded-none">
        <TabsNavigation />
        <UserAvatar profilePhoto={profilePhoto} username={username} />
      </div>
      <TabsContent
        value="account"
        className="p-6 flex justify-center items-center bg-teal-100 mt-0 relative"
      >
        <Image
          src="/images/mandala.svg"
          alt="Mandala Decoration"
          className="absolute top-[2%] left-[5%] opacity-70"
          width={200}
          height={200}
        />
        <Image
          src="/images/mandala.svg"
          alt="Mandala Decoration"
          className="absolute top-[20%] left-[15%] opacity-60"
          width={100}
          height={100}
        />

        <Card className="w-full max-w-3xl ml-auto p-6 bg-white relative z-10 shadow-xl rounded-lg">
          <form
            onSubmit={handleSubmit(onSubmitAccount)}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-gray-900">
              ویرایش حساب کاربری
            </h2>
            <p className="text-gray-600">
              در این قسمت می‌توانید اطلاعات کاربری خود را ویرایش کنید
            </p>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="avatar">تصویر پروفایل</Label>
                <Avatar
                  width={150}
                  height={150}
                  src={preview || undefined}
                  label="انتخاب کنید"
                  labelStyle={{ fontSize: "14px" }}
                  onClose={() => setPreview(null)}
                  onCrop={(croppedImage) => setAvatarFile(croppedImage)}
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

              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="bg-teal-600 hover:bg-teal-700 text-white rounded-md"
                >
                  ویرایش و اعمال تغییرات
                </Button>
              </div>
            </div>
          </form>
        </Card>
      </TabsContent>
      <TabsContent
        value="reservationManagement"
        className="p-6 bg-white dark:bg-gray-800 min-h-[calc(100vh-80px)]"
      ></TabsContent>
      <TabsContent
        value="users"
        className="p-6 bg-teal-100 mt-0 relative h-[81vh]"
      >
        <Image
          src="/images/mandala.svg"
          alt="Mandala Decoration"
          className="absolute bottom-[2%] left-[2%] opacity-70"
          width={200}
          height={200}
        />
        <Image
          src="/images/mandala.svg"
          alt="Mandala Decoration"
          className="absolute bottom-[20%] left-[13%] opacity-60"
          width={100}
          height={100}
        />
        <Card className="w-full max-w-[90%] ml-auto p-6 bg-white/80 relative z-10 shadow-xl rounded-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            لیست کاربران
          </h2>
          <div className="overflow-x-auto">
            <UserList users={users} />
          </div>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

export default AdminDashboard;
