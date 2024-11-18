import { axiosInstance } from "@/app/api/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface BlogDetail {
  id: number;
  title: string;
  content: string;
  comments_enabled: number;
  created_at: string;
  updated_at: string;
  author_first_name: string;
  author_last_name: string;
}

interface NewsDetailCardProps {
  blogId: number;
  isOpen: boolean;
  onClose: () => void;
}

const NewsDetailedCard = ({
  blogId,
  isOpen,
  onClose,
}: NewsDetailCardProps) => {
  const [blogDetail, setBlogDetail] = useState<BlogDetail | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchBlogDetail(blogId);
      fetchBlogThumbnail(blogId);
    }
  }, [isOpen, blogId]);

  const fetchBlogDetail = async (id: number) => {
    try {
      const response = await axiosInstance.get<BlogDetail>(`/blog/${id}`);
      setBlogDetail(response.data);
    } catch (error) {
      console.error("Error fetching blog detail:", error);
      toast.error("خطا در دریافت اطلاعات خبر");
    }
  };

  const fetchBlogThumbnail = async (id: number) => {
    try {
      const response = await axiosInstance.get(`/blog/thumbnail/${id}`, {
        responseType: "blob",
      });
      const imageUrl = URL.createObjectURL(response.data);
      setThumbnailUrl(imageUrl);
    } catch (error) {
      console.error("Error fetching blog thumbnail:", error);
    }
  };

  if (!blogDetail) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl p-6 overflow-y-auto max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-right font-bold text-2xl">
            {blogDetail.title}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col lg:flex-row gap-6 mt-4">
          {thumbnailUrl && (
            <div className="flex-shrink-0">
              <img
                src={thumbnailUrl}
                alt={blogDetail.title}
                className="w-48 h-48 rounded-md object-cover mx-auto lg:mx-0"
              />
            </div>
          )}
          <div className="flex flex-col gap-4">
            <p className="text-right text-base">{blogDetail.content}</p>
            <p className="text-right text-sm text-gray-600">
              نویسنده: {blogDetail.author_first_name}{" "}
              {blogDetail.author_last_name}
            </p>
            <p className="text-right text-sm text-gray-600">
              تاریخ ایجاد:{" "}
              {new Date(blogDetail.created_at).toLocaleString("fa-IR")}
            </p>
            <div className="flex items-center text-right text-sm text-gray-600 gap-2">
              <span>وضعیت نظرات:</span>
              {blogDetail.comments_enabled ? (
                <div className="flex items-center text-green-600">
                  <CheckCircle size={18} className="mr-1" />
                  <span>فعال</span>
                </div>
              ) : (
                <div className="flex items-center text-red-600">
                  <XCircle size={18} className="mr-1" />
                  <span>غیرفعال</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <DialogFooter className="flex justify-end mt-6">
          <Button
            onClick={onClose}
            className="bg-red-500 text-white hover:bg-red-600"
          >
            بستن
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewsDetailedCard;
