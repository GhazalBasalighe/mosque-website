"use client";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface CommentFormProps {
  commentableId: number;
  commentableType: "blog" | "journal";
  parentId?: number;
  onCommentSubmit?: () => void;
}

const CommentForm: React.FC<CommentFormProps> = ({
  commentableId,
  commentableType,
  parentId = 0,
  onCommentSubmit,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    if (!name.trim()) {
      toast.error("نام را وارد کنید");
      return false;
    }
    if (!email.trim()) {
      toast.error("ایمیل را وارد کنید");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("ایمیل معتبر نیست");
      return false;
    }
    if (!body.trim()) {
      toast.error("متن نظر را وارد کنید");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const commentData = {
        body,
        name,
        email,
        commentableType,
        commentableId,
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVICE_URL}/comment`,
        commentData
      );

      toast.success("نظر شما با موفقیت ارسال شد");

      // Reset form
      setName("");
      setEmail("");
      setBody("");

      // Optional callback for parent component
      if (onCommentSubmit) {
        onCommentSubmit();
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
      toast.error("مشکلی در ارسال نظر رخ داده است");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="px-12 w-3/4">
      <h3 className="text-2xl font-bold mb-4">ثبت نظر جدید</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            نام
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="نام خود را وارد کنید"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            ایمیل
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="ایمیل خود را وارد کنید"
          />
        </div>

        <div>
          <label
            htmlFor="body"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            متن نظر
          </label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="نظر خود را بنویسید"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-6 py-3 rounded-md text-white font-bold transition-colors ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-teal-600 hover:bg-teal-700"
          }`}
        >
          {isSubmitting ? "در حال ارسال..." : "ارسال نظر"}
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
