"use client";
import { useState, useEffect } from "react";
import CustomPagination from "@/app/components/Pagination/Pagination";
import axios from "axios";
import { CheckCircle, Clock, User, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  useEffect(() => {
    fetchAllThumbnails(initialNews);
  }, [initialNews]);

  const fetchAllThumbnails = async (newsList: News[]) => {
    try {
      const fetchedThumbnails: { [key: number]: string } = {};
      for (const item of newsList) {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVICE_URL}/blog/thumbnail/${item.id}`,
            {
              responseType: "blob",
            }
          );
          fetchedThumbnails[item.id] = URL.createObjectURL(response.data);
        } catch (error) {
          console.warn(
            `Failed to fetch thumbnail for ID ${item.id}:`,
            error
          );
        }
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
    router.prefetch(`/news/${blogId}`);
    router.push(`/news/${blogId}`);
  };

  return (
    <section className="py-12 bg-gray-200 text-gray-900 border-b-2 border-gray-300">
      <div className="container mx-auto px-6 lg:px-12 text-right">
        <div className="text-center mb-20 relative">
          <h2 className="text-4xl font-bold mt-10">اخبار و رویداد‌ها</h2>
          <img
            src="/images/frame.svg"
            alt="Decorative Frame"
            className="absolute left-1/2 transform -translate-x-1/2"
            style={{ top: -45, width: "480px", height: "150px" }}
          />
        </div>

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
                {thumbnails[item.id] ? (
                  <div className="relative">
                    <img
                      src={thumbnails[item.id]}
                      alt={item.title}
                      className="w-full h-48 object-cover "
                    />
                    <div className="absolute bottom-0 right-0 m-4">
                      {item.comments_enabled ? (
                        <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm flex items-center">
                          <CheckCircle size={16} className="mr-1" />
                          نظرات فعال
                        </div>
                      ) : (
                        <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm flex items-center">
                          <XCircle size={16} className="mr-1" />
                          نظرات غیر فعال
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-48 bg-gradient-to-r from-teal-500 to-blue-500 relative">
                    <div className="absolute bottom-0 right-0 m-4">
                      {item.comments_enabled ? (
                        <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm flex items-center">
                          <CheckCircle size={16} className="mr-1" />
                          نظرات فعال
                        </div>
                      ) : (
                        <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm flex items-center">
                          <XCircle size={16} className="mr-1" />
                          نظرات غیر فعال
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 hover:text-teal-600 transition-colors">
                    {item.title}
                  </h2>

                  {/* Render content from Quill Editor */}
                  <div
                    className="text-gray-600 mb-4 line-clamp-3"
                    dangerouslySetInnerHTML={{
                      __html: item.content || "بدون محتوا",
                    }}
                  ></div>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <User size={16} className="ml-2" />
                      <span>
                        {item.author_first_name} {item.author_last_name}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span>
                        {new Date(item.created_at).toLocaleDateString(
                          "fa-IR"
                        )}
                      </span>
                      <Clock size={16} className="mr-2" />
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
      </div>
    </section>
  );
}
