import { useState } from "react";
import NewsDetailedCard from "@/app/components/NewsDetailedCard/NewsDetailedCard";
import CustomPagination from "@/app/components/Pagination/Pagination";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import { CheckCircle, XCircle } from "lucide-react";
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
  const [page, setPage] = useState<number>(initialPage);
  const [selectedBlogId, setSelectedBlogId] = useState<number | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handlePageChange = async (newPage: number) => {
    try {
      if (!process.env.NEXT_PUBLIC_SERVICE_URL) return;
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVICE_URL}/blog?page=${newPage}&per_page=${perPage}`
      );
      const data = response.data;
      setNews(data.data);
      setPage(newPage);
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
    <div className="container mx-auto p-4">
      <h1 className="text-center text-3xl font-bold mb-6 text-teal-700">
        اخبار
      </h1>

      <div className="news-list">
        {news.length > 0 ? (
          news.map((item) => (
            <div
              key={item.id}
              className="news-item border-b border-gray-300 py-4 cursor-pointer hover:bg-gray-100"
              onClick={() => handleRowClick(item.id)}
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {item.title}
              </h2>
              <p className="text-gray-700 mb-2">
                {item.content
                  ? `${item.content.substring(0, 100)}...`
                  : "بدون محتوا"}
              </p>
              <div className="text-sm text-gray-600">
                {item.comments_enabled ? (
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
          ))
        ) : (
          <div className="p-4 text-center text-gray-500">
            هیچ خبری موجود نیست.
          </div>
        )}
      </div>

      <div className="flex justify-center mt-6">
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
  );
}
