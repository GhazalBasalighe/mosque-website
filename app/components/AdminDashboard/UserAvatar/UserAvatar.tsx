import { axiosInstance } from "@/app/api/api";
import { convertToPersianDigits } from "@/app/helpers/convertToPersianDigits";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

type UserAvatarProps = {
  profilePhoto: string;
  username: string | null;
  hasLoggedOut: boolean;
  setHasLoggedOut: React.Dispatch<React.SetStateAction<boolean>>;
};

type UserProfile = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  role: string;
};

export function UserAvatar({
  profilePhoto,
  username,
  hasLoggedOut,
  setHasLoggedOut,
}: UserAvatarProps) {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const userId = localStorage.getItem("id");
      if (userId) {
        try {
          const response = await axiosInstance.get(`/user/${userId}`);
          setUserProfile(response.data);
        } catch (error) {
          console.error("Failed to fetch user profile", error);
          toast.error("خطا در بارگذاری اطلاعات کاربری");
        }
      }
    };

    fetchUserProfile();
  }, []);

  const logout = () => {
    if (typeof window !== "undefined") {
      const currentPath = window.location.pathname;
      if (currentPath !== "/") {
        window.location.href = "/auth";
      }
      setHasLoggedOut(true);
      localStorage.clear();
      toast.success("خروج با موفقیت انجام شد");
    }
  };

  const rolePath = localStorage.getItem("role")?.toLowerCase();

  if (!hasLoggedOut) {
    return (
      <div className="flex items-center gap-4 space-x-4">
        <Popover>
          <PopoverTrigger>
            <img
              src={profilePhoto}
              alt="Profile Picture"
              className="w-12 h-12 rounded-full object-cover cursor-pointer"
            />
          </PopoverTrigger>
          <PopoverContent className="w-64 p-4 bg-white border border-gray-200 rounded-lg shadow-lg">
            {userProfile ? (
              <div>
                <h3 className="text-lg font-bold">{`${userProfile.first_name} ${userProfile.last_name}`}</h3>
                <p className="text-gray-600 flex gap-2">
                  <span>نام کاربری:</span>
                  <span>{userProfile.username}</span>
                </p>
                <p className="text-gray-600 flex gap-2">
                  <span>شماره تماس:</span>
                  <span>
                    {convertToPersianDigits(userProfile.phone_number)}
                  </span>
                </p>
                <p className="text-gray-600 flex gap-2">
                  <span>نقش‌:</span>
                  <span>{userProfile.role}</span>
                </p>
                {/* Role-based link */}
                {rolePath && (
                  <Link
                    href={`/${rolePath}`}
                    className="text-teal-500 hover:underline mt-2 block"
                  >
                    مشاهده پنل کاربری{" "}
                  </Link>
                )}
              </div>
            ) : (
              <p>در حال بارگذاری...</p>
            )}
          </PopoverContent>
        </Popover>
        {username && (
          <span className="text-white font-bold">سلام {username} !</span>
        )}
        <Button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          خروج
        </Button>
      </div>
    );
  }
}
