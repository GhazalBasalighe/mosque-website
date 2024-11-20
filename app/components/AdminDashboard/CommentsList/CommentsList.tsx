import { useEffect, useState } from "react";
import { axiosInstance } from "@/app/api/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import toast from "react-hot-toast";
import { convertToPersianDigits } from "@/app/helpers/convertToPersianDigits";

type Comment = {
  id: number;
  body: string;
  name: string;
  email: string;
  parentId: number;
  commentableType: string;
  commentableId: number;
  show: boolean;
  created_at: string;
};

export function CommentList() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get<Comment[]>("/comments");
      setComments(response.data);
    } catch (error) {
      console.error("Failed to fetch comments", error);
      toast.error("بارگزاری نظرات با خطا مواجه شد");
    } finally {
      setLoading(false);
    }
  };

  const toggleShowState = async (
    commentId: number,
    currentState: boolean
  ) => {
    try {
      await axiosInstance.patch(`/comments/${commentId}`, {
        show: !currentState,
      });
      setComments((prev) =>
        prev.map((comment) =>
          comment.id === commentId
            ? { ...comment, show: !currentState }
            : comment
        )
      );
      toast.success("وضعیت نمایش با موفقیت تغییر یافت");
    } catch (error) {
      console.error("Failed to toggle show state", error);
      toast.error("تغییر وضعیت نمایش با خطا مواجه شد");
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="max-h-96 overflow-y-auto">
      <Table className="border-none rounded-2xl w-full">
        <TableHeader className="bg-teal-100 rounded-t-lg hover:bg-teal-200">
          <TableRow>
            <TableHead className="text-start p-4">متن نظر</TableHead>
            <TableHead className="text-start p-4">نام</TableHead>
            <TableHead className="text-start p-4">ایمیل</TableHead>
            <TableHead className="text-start p-4">نوع</TableHead>
            <TableHead className="text-start p-4">
              شناسه قابل نظر
            </TableHead>
            <TableHead className="text-start p-4">تاریخ ایجاد</TableHead>
            <TableHead className="text-start p-4">وضعیت نمایش</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                در حال بارگزاری...
              </TableCell>
            </TableRow>
          ) : comments.length > 0 ? (
            comments.map((comment) => (
              <TableRow
                key={comment.id}
                className="border-b last:border-none"
              >
                <TableCell className="p-4 text-start">
                  {comment.body}
                </TableCell>
                <TableCell className="p-4 text-start">
                  {comment.name}
                </TableCell>
                <TableCell className="p-4 text-start">
                  {comment.email}
                </TableCell>
                <TableCell className="p-4 text-start">
                  {comment.commentableType}
                </TableCell>
                <TableCell className="p-4 text-start">
                  {convertToPersianDigits(
                    comment.commentableId.toString()
                  )}
                </TableCell>
                <TableCell className="p-4 text-start">
                  {convertToPersianDigits(
                    new Date(comment.created_at).toLocaleDateString(
                      "fa-IR"
                    )
                  )}
                </TableCell>
                <TableCell className="p-4 text-start">
                  <span
                    className={`cursor-pointer ${
                      comment.show
                        ? "bg-green-500 text-white"
                        : "bg-yellow-500 text-black"
                    }`}
                    onClick={() =>
                      toggleShowState(comment.id, comment.show)
                    }
                  >
                    {comment.show ? "نمایش داده شده" : "نمایش داده نشده"}
                  </span>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                هیچ نظری موجود نیست
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
