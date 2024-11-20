"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

interface NewsItem {
  id: number;
  title: string;
  created_at: string;
  thumbnailFileName: string;
  content: string; // WYSIWYG editor output (HTML)
}

export default function NewsSection() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [thumbnails, setThumbnails] = useState<{ [key: number]: string }>(
    {}
  );

  const fetchLatestNews = async () => {
    try {
      const response = await axios.get<{ data: NewsItem[] }>(
        `${process.env.NEXT_PUBLIC_SERVICE_URL}/blog/newest`
      );
      const newsData = response.data.data;
      setNewsItems(newsData);

      // Fetch thumbnails after news items are loaded
      fetchAllThumbnails(newsData);
    } catch (err) {
      console.error("Error fetching news:", err);
      setError("مشکلی در بارگزاری اخبار وجود دارد.");
    } finally {
      setLoading(false);
    }
  };

  const fetchAllThumbnails = async (newsList: NewsItem[]) => {
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

  useEffect(() => {
    fetchLatestNews();
  }, []);

  return (
    <section className="py-12 bg-gray-200 text-gray-900 border-b-2 border-gray-300">
      <div className="container mx-auto px-6">
        {/* Section Title with Decorative Frame */}
        <div className="text-center mt-10 mb-20 relative">
          <h2 className="text-3xl font-bold">اخبار و رویدادهای مسجد</h2>
          <img
            src="/images/frame.svg"
            alt="Decorative Frame"
            className="absolute left-1/2 transform -translate-x-1/2 mb-10"
            style={{ top: -70, width: "600px", height: "170px" }}
          />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center">
            <p className="text-gray-600 text-lg">در حال بارگذاری...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center">
            <p className="text-red-500 text-lg">{error}</p>
          </div>
        )}

        {/* News Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsItems.map((item) => (
              <div
                key={item.id}
                className="relative bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 duration-300 hover:shadow-2xl"
              >
                {/* News Image with Overlay */}
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  {thumbnails[item.id] ? (
                    <img
                      src={thumbnails[item.id]}
                      alt={item.title}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-300 flex items-center justify-center">
                      <span className="text-gray-500">بدون تصویر</span>
                    </div>
                  )}
                </div>

                {/* News Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {new Date(item.created_at).toLocaleDateString("fa-IR")}
                  </p>
                  {/* Render WYSIWYG content preview */}
                  <div
                    className="text-gray-700 mb-4 line-clamp-2"
                    dangerouslySetInnerHTML={{
                      __html: item.content,
                    }}
                  ></div>
                  <Link
                    href={`/news/${item.id}`}
                    className="text-teal-600 hover:text-teal-700 transition-colors"
                  >
                    ادامه مطلب
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View All News Button */}
        {!loading && !error && (
          <div className="text-center mt-8">
            <Link href="/news">
              <button className="bg-teal-600 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-teal-700 transition-colors">
                مشاهده تمامی اخبار
              </button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
