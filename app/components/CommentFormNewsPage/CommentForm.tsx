"use client";
import { axiosInstance } from "@/app/api/api";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

interface Comment {
  id: number;
  body: string;
  name: string;
  email: string;
  created_at: string;
  parent_id: number | null;
  replies?: Comment[];
}

interface CommentFormProps {
  commentableId: number;
  commentableType: string;
}

const CommentForm: React.FC<CommentFormProps> = ({
  commentableId,
  commentableType,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState({
    name: "",
    email: "",
    body: "",
  });
  const [replyTo, setReplyTo] = useState<number | null>(null);

  // Helper function to build nested comment structure
  const buildCommentTree = (commentsData: Comment[]): Comment[] => {
    const commentMap = new Map<number, Comment>();
    const rootComments: Comment[] = [];

    // First pass: create map of all comments
    commentsData.forEach((comment) => {
      commentMap.set(comment.id, { ...comment, replies: [] });
    });

    // Second pass: build tree structure
    commentMap.forEach((comment) => {
      if (comment.parent_id && commentMap.has(comment.parent_id)) {
        // Add as reply to parent
        const parent = commentMap.get(comment.parent_id);
        if (parent && parent.replies) {
          parent.replies.push(comment);
        }
      } else if (!comment.parent_id) {
        // Add to root level comments
        rootComments.push(comment);
      }
    });

    // Sort comments and replies by created_at (newest first)
    rootComments.forEach((comment) => {
      if (comment.replies) {
        comment.replies.sort(
          (a, b) =>
            new Date(b.created_at).getTime() -
            new Date(a.created_at).getTime()
        );
      }
    });

    return rootComments.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  };

  // Fetch existing comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axiosInstance.get(
          `/comment/${commentableType}/${commentableId}`
        );
        const commentsData = response.data.comments;
        const nestedComments = buildCommentTree(commentsData);
        setComments(nestedComments);
      } catch (err: any) {
        if (err.response?.status !== 404) {
          toast.error("خطایی در بارگزاری نظرات پیش آمد");
        } else console.error(err);
      }
    };

    fetchComments();
  }, [commentableId, commentableType]);

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewComment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit new comment or reply
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post(`/comment`, {
        ...newComment,
        commentableType,
        commentableId,
        parentId: replyTo || null,
      });

      setNewComment({
        name: "",
        email: "",
        body: "",
      });

      setReplyTo(null);
      toast.success(
        "نظر شما با موفقیت ارسال شد و پس از تایید مدیریت نمایش داده خواهد شد",
        {
          duration: 6000,
          style: {
            textAlign: "center",
          },
        }
      );
    } catch (err) {
      toast.error("خطایی در ارسال نظر پیش آمده");
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto px-6 lg:px-12 mt-8">
      {/* Comments List */}
      {comments.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">نظرات</h2>
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">{comment.name}</h3>
                <span className="text-sm text-gray-500">
                  {new Date(comment.created_at).toLocaleDateString(
                    "fa-IR"
                  )}
                </span>
              </div>
              <p className="text-gray-700 mb-4">{comment.body}</p>
              <button
                onClick={() => setReplyTo(comment.id)}
                className="text-teal-600 hover:text-teal-800 text-sm"
              >
                پاسخ
              </button>

              {/* Replies */}
              {comment.replies && comment.replies.length > 0 && (
                <div className="mt-4 mr-6 border-r-2 pr-4">
                  {comment.replies.map((reply) => (
                    <div
                      key={reply.id}
                      className="bg-gray-50 rounded px-4 py-3 mb-2 shadow-sm"
                    >
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="text-sm font-medium">
                          {reply.name}
                        </h4>
                        <span className="text-xs text-gray-500">
                          {new Date(reply.created_at).toLocaleDateString(
                            "fa-IR"
                          )}
                        </span>
                      </div>
                      <p className="text-gray-600">{reply.body}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Reply Form */}
              {replyTo === comment.id && (
                <form
                  onSubmit={handleSubmit}
                  className="mt-4 bg-gray-50 shadow-sm rounded px-6 pt-4 pb-6 border"
                >
                  <h4 className="text-md font-bold mb-4">
                    پاسخ به {comment.name}
                  </h4>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="name"
                    >
                      نام
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="name"
                      type="text"
                      name="name"
                      value={newComment.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="email"
                    >
                      ایمیل
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="email"
                      type="email"
                      name="email"
                      value={newComment.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="body"
                    >
                      متن نظر
                    </label>
                    <textarea
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="body"
                      name="body"
                      value={newComment.body}
                      onChange={handleInputChange}
                      required
                      rows={3}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <button
                      className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="submit"
                    >
                      ارسال پاسخ
                    </button>
                    <button
                      className="text-gray-600 hover:text-gray-800"
                      type="button"
                      onClick={() => setReplyTo(null)}
                    >
                      انصراف
                    </button>
                  </div>
                </form>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Main Comment Form */}
      {!replyTo && (
        <form
          onSubmit={handleSubmit}
          className="bg-gray-50 shadow-md rounded px-8 pt-6 pb-8 mb-8 border"
        >
          <h2 className="text-2xl font-bold mb-6">ارسال نظر جدید</h2>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              نام
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              name="name"
              value={newComment.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              ایمیل
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              name="email"
              value={newComment.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="body"
            >
              متن نظر
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="body"
              name="body"
              value={newComment.body}
              onChange={handleInputChange}
              required
              rows={4}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              ارسال نظر
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CommentForm;
