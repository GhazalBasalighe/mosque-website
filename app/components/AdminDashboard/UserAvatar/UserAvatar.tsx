import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

type UserAvatarProps = {
  profilePhoto: string;
  username: string | null;
};

export function UserAvatar({ profilePhoto, username }: UserAvatarProps) {
  const router = useRouter();

  const logout = () => {
    localStorage.clear();
    toast.success("خروج با موفقیت انجام شد");
    router.replace("/auth");
  };

  return (
    <div className="flex items-center gap-4 space-x-4">
      <img
        src={profilePhoto}
        alt="Profile Picture"
        className="w-12 h-12 rounded-full object-cover"
      />
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
