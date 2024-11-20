import { useState } from "react";
import dynamic from "next/dynamic"; // Required for SSR
import { axiosInstance } from "@/app/api/api";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch"; // ShadCN switch component
import toast from "react-hot-toast";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

// ReactQuill styles
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ align: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ direction: "rtl" }],
    ["link"],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "align",
  "blockquote",
  "list",
  "bullet",
  "direction",
  "link",
];

const CreateNewsCard = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>(""); // HTML content from ReactQuill
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [commentsEnabled, setCommentsEnabled] = useState<boolean>(false); // State for comments toggle

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      // Adding only fields that are filled
      if (title) {
        formData.append("title", title);
      }
      if (content) {
        formData.append("content", content); // HTML content
      }
      if (thumbnail) {
        formData.append("thumbnail", thumbnail);
      }

      // Adding comments_enabled to the body
      formData.append(
        "comments_enabled",
        commentsEnabled === true ? "1" : "0"
      );

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
      setCommentsEnabled(false); // Reset switch to default
    } catch (error) {
      console.error("Error creating news:", error);
      toast.error("خطا در ایجاد خبر");
    }
  };

  return (
    <Card className="w-full rtl mb-8 bg-white/90 relative z-10">
      <CardHeader>
        <CardTitle className="text-right font-bold text-2xl">
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
            <ReactQuill
              value={content}
              onChange={setContent}
              placeholder="محتوای خبر را وارد کنید"
              modules={modules}
              formats={formats}
              className="text-right rtl h-40 mb-16 rounded-md"
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
          <div className="flex items-center justify-between">
            <label className="text-right text-sm font-medium">
              فعال‌سازی نظرات
            </label>
            <Switch
              checked={commentsEnabled}
              onCheckedChange={(checked) => setCommentsEnabled(checked)}
              className=" bg-gray-300 data-[state=checked]:bg-teal-600"
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
