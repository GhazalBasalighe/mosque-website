import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/app/api/api";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { convertToPersianDigits } from "@/app/helpers/convertToPersianDigits";

type UserAvatarProps = {
  profilePhoto: string;
  username: string | null;
};

type UserProfile = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  role: string;
};

export function UserAvatar({ profilePhoto, username }: UserAvatarProps) {
  const router = useRouter();
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
    localStorage.clear();
    toast.success("خروج با موفقیت انجام شد");
    router.replace("/auth");
  };

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
