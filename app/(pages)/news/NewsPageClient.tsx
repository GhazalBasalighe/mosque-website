"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Clock, User } from "lucide-react";
import NewsDetailedCard from "@/app/components/NewsDetailedCard/NewsDetailedCard";
import CustomPagination from "@/app/components/Pagination/Pagination";
import axios from "axios";

interface NewsPageProps {
  initialNews: News[];
  total: number;
  page: number;
  perPage: number;
}

interface News {
  id: number;
  title: string;
  content: string;
  comments_enabled: number;
  created_at: string;
  updated_at: string;
  author_first_name: string;
  author_last_name: string;
}

export default function NewsPageClient({
  initialNews,
  total,
  page: initialPage,
  perPage,
}: NewsPageProps) {
  const [news, setNews] = useState<News[]>(initialNews);
  const [thumbnails, setThumbnails] = useState<{ [key: number]: string }>(
    {}
  );
  const [page, setPage] = useState<number>(initialPage);
  const [selectedBlogId, setSelectedBlogId] = useState<number | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchAllThumbnails(initialNews);
  }, [initialNews]);

  const fetchAllThumbnails = async (newsList: News[]) => {
    try {
      const fetchedThumbnails: { [key: number]: string } = {};
      for (const item of newsList) {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVICE_URL}/blog/thumbnail/${item.id}`,
          {
            responseType: "blob",
          }
        );
        fetchedThumbnails[item.id] = URL.createObjectURL(response.data);
      }
      setThumbnails(fetchedThumbnails);
    } catch (error) {
      console.error("Error fetching thumbnails:", error);
    }
  };

  const handlePageChange = async (newPage: number) => {
    try {
      if (!process.env.NEXT_PUBLIC_SERVICE_URL) return;
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVICE_URL}/blog?page=${newPage}&per_page=${perPage}`
      );
      const data = response.data;
      setNews(data.data);
      setPage(newPage);
      fetchAllThumbnails(data.data); // Fetch thumbnails for the new page
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  const handleRowClick = (blogId: number) => {
    setSelectedBlogId(blogId);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedBlogId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-5xl font-bold mb-12 text-gray-800 text-center">
          اخبار
          <div className="h-1 w-24 bg-teal-500 mx-auto mt-4 rounded-full" />
        </h1>

        {news.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500 text-xl">هیچ خبری موجود نیست.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item, index) => (
              <div
                key={item.id}
                className={`bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer ${
                  index === 0 ? "md:col-span-2 lg:col-span-3" : ""
                }`}
                onClick={() => handleRowClick(item.id)}
              >
                {/* Thumbnail or Placeholder */}
                {thumbnails[item.id] ? (
                  <img
                    src={thumbnails[item.id]}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gradient-to-r from-teal-500 to-blue-500 relative">
                    <div className="absolute bottom-0 right-0 m-4">
                      {item.comments_enabled ? (
                        <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm flex items-center">
                          <CheckCircle size={16} className="mr-1" />
                          فعال
                        </div>
                      ) : (
                        <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm flex items-center">
                          <XCircle size={16} className="mr-1" />
                          غیرفعال
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 hover:text-teal-600 transition-colors">
                    {item.title}
                  </h2>

                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {item.content ? item.content : "بدون محتوا"}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <User size={16} className="mr-2" />
                      <span>
                        {item.author_first_name} {item.author_last_name}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Clock size={16} className="mr-2" />
                      <span>
                        {new Date(item.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <CustomPagination
            currentPage={page}
            totalCount={total}
            pageSize={perPage}
            onPageChange={handlePageChange}
          />
        </div>

        {selectedBlogId && (
          <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
            <DialogContent className="max-w-3xl p-6 overflow-y-auto max-h-[80vh]">
              <NewsDetailedCard
                blogId={selectedBlogId}
                isOpen={isDialogOpen}
                onClose={handleDialogClose}
              />
              <DialogFooter className="flex justify-end mt-4">
                <Button
                  onClick={handleDialogClose}
                  className="bg-red-500 text-white hover:bg-red-600"
                >
                  بستن
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}
