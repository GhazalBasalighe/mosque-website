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
import { Trash } from "lucide-react";
import toast from "react-hot-toast";
import DeleteConfirmDialog from "@/app/components/DeleteConfirmDialog/DeleteConfirmDialog";
import { convertToPersianDigits } from "@/app/helpers/convertToPersianDigits";

type Comment = {
  id: number;
  body: string;
  name: string;
  email: string;
  show: boolean | null;
  created_at: string;
  commentableType: string;
  commentableId: number;
};

export function CommentList() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [commentToDelete, setCommentToDelete] = useState<number | null>(
    null
  );

  const fetchComments = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get<Comment[]>("/comment");
      setComments(response.data);
    } catch (error) {
      console.error("Failed to fetch comments", error);
      toast.error("بارگزاری نظرات با خطا مواجه شد");
    } finally {
      setLoading(false);
    }
  };

  const deleteComment = async () => {
    if (commentToDelete !== null) {
      try {
        await axiosInstance.delete(`/comment/${commentToDelete}`);
        setComments((prev) =>
          prev.filter((comment) => comment.id !== commentToDelete)
        );
        toast.success("نظر با موفقیت حذف شد");
        setCommentToDelete(null);
        setIsDialogOpen(false);
      } catch (error) {
        console.error("Failed to delete comment", error);
        toast.error("حذف نظر با خطا مواجه شد");
      }
    }
  };

  const openDeleteDialog = (commentId: number) => {
    setCommentToDelete(commentId);
    setIsDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setCommentToDelete(null);
    setIsDialogOpen(false);
  };

  const toggleShowState = async (
    commentId: number,
    currentState: boolean | null
  ) => {
    try {
      const newState = currentState === null ? true : !currentState;
      await axiosInstance.patch(`/comment/showStatus/${commentId}`, {
        show: newState,
      });
      setComments((prev) =>
        prev.map((comment) =>
          comment.id === commentId
            ? { ...comment, show: newState }
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
    <>
      <div className="max-h-96 overflow-y-auto">
        <Table className="border-none rounded-2xl w-full">
          <TableHeader className="bg-teal-100 rounded-t-lg hover:bg-teal-200">
            <TableRow>
              <TableHead className="text-start p-4">متن نظر</TableHead>
              <TableHead className="text-start p-4">نام</TableHead>
              <TableHead className="text-start p-4">ایمیل</TableHead>
              <TableHead className="text-start p-4">نوع</TableHead>
              <TableHead className="text-start p-4">تاریخ ایجاد</TableHead>
              <TableHead className="text-start p-4">وضعیت نمایش</TableHead>
              <TableHead className="text-start p-4">اقدامات</TableHead>
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
                  className="border-b last:border-none relative"
                  onMouseEnter={() => setHoveredRow(comment.id)}
                  onMouseLeave={() => setHoveredRow(null)}
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
                    {comment.commentableType === "blog" ? "وبلاگ" : "خبر"}
                  </TableCell>
                  <TableCell className="p-4 text-start">
                    {convertToPersianDigits(
                      new Date(comment.created_at).toLocaleDateString(
                        "fa-IR"
                      )
                    )}
                  </TableCell>
                  <TableCell className="p-4 text-start">
                    <button
                      className={`cursor-pointer px-3 py-1 rounded-full text-white ${
                        comment.show
                          ? "bg-green-500 hover:bg-green-600"
                          : comment.show === null
                          ? "bg-gray-500 hover:bg-gray-600"
                          : "bg-yellow-500 hover:bg-yellow-600"
                      }`}
                      onClick={() =>
                        toggleShowState(comment.id, comment.show)
                      }
                    >
                      {comment.show
                        ? "نمایش داده شده"
                        : comment.show === null
                        ? "نامشخص"
                        : "نمایش داده نشده"}
                    </button>
                  </TableCell>
                  <TableCell className="p-4 text-start relative">
                    {hoveredRow === comment.id && (
                      <button
                        onClick={() => openDeleteDialog(comment.id)}
                        className="text-red-500 hover:text-red-700"
                        aria-label="Delete Comment"
                      >
                        <Trash />
                      </button>
                    )}
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

      {/* Confirmation Dialog */}
      <DeleteConfirmDialog
        isOpen={isDialogOpen}
        onClose={closeDeleteDialog}
        onConfirm={deleteComment}
      />
    </>
  );
}
