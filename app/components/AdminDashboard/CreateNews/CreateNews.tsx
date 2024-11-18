import { useState } from "react";
import { axiosInstance } from "@/app/api/api";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

const CreateNewsCard = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      // Adding only fields that are filled
      if (title) {
        formData.append("title", title);
      }
      if (content) {
        formData.append("content", content);
      }
      if (thumbnail) {
        formData.append("thumbnail", thumbnail);
      }

      // Sending post request to /blog endpoint
      await axiosInstance.post("/blog", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Success feedback
      toast.success("خبر جدید با موفقیت ایجاد شد");

      // Reset form fields after successful submission
      setTitle("");
      setContent("");
      setThumbnail(null);
    } catch (error) {
      console.error("Error creating news:", error);
      toast.error("خطا در ایجاد خبر");
    }
  };

  return (
    <Card className="w-full rtl mb-8 bg-white/90">
      <CardHeader>
        <CardTitle className="text-right font-bold text-xl">
          ایجاد خبر جدید
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="text-right text-sm font-medium mb-2">
              عنوان
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="عنوان خبر را وارد کنید"
              className="text-right"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-right text-sm font-medium mb-2">
              محتوا
            </label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="محتوای خبر را وارد کنید"
              className="text-right"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-right text-sm font-medium mb-2">
              تصویر
            </label>
            <Input
              type="file"
              onChange={(e) => {
                if (e.target.files) {
                  setThumbnail(e.target.files[0]);
                }
              }}
              accept="image/*"
              className="text-right"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          onClick={handleSubmit}
          className="bg-teal-600 text-white hover:bg-teal-700"
        >
          ایجاد خبر
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CreateNewsCard;
