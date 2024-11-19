import Footer from "@/app/components/layout/Footer/Footer";
import Header from "@/app/components/layout/Header/Header";
import { BlogDetail } from "@/app/components/NewsDetailedCard/NewsDetailedCard";
import axios from "axios";
import Image from "next/image";

interface NewsDetailsProps {
  params: { id: string };
}

export default async function NewsDetailsPage({
  params,
}: NewsDetailsProps) {
  const { id } = params;

  // Fetch the news details
  const fetchNewsDetails = async (id: string) => {
    const response = await axios.get<BlogDetail>(
      `${process.env.NEXT_PUBLIC_SERVICE_URL}/blog/${id}`
    );
    return response.data;
  };

  // Fetch the thumbnail
  const fetchThumbnail = async (id: string) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVICE_URL}/blog/thumbnail/${id}`,
        { responseType: "blob" }
      );
      return URL.createObjectURL(response.data);
    } catch (error) {
      console.warn(`Failed to fetch thumbnail for ID ${id}:`, error);
      return null; // Return null if thumbnail fetch fails
    }
  };

  const news = await fetchNewsDetails(id);
  const thumbnail = await fetchThumbnail(id);

  return (
    <>
      <Header />
      <section className="py-12 bg-gray-200 text-gray-900 border-b-2 border-gray-300">
        <div className="container mx-auto px-6 lg:px-12 text-right">
          {/* Title */}
          <h1 className="text-4xl font-bold mb-6">{news.title}</h1>

          {/* Author and Date */}
          <div className="text-sm text-gray-500 mb-4">
            <span>
              {news.author_first_name} {news.author_last_name}
            </span>{" "}
            |{" "}
            <span>
              {new Date(news.created_at).toLocaleDateString("fa-IR")}
            </span>
          </div>

          {/* Thumbnail */}
          {thumbnail && (
            <div className="mb-6">
              <Image
                src={thumbnail}
                alt={news.title}
                width={800}
                height={400}
                className="w-full h-auto rounded-lg shadow-lg object-cover"
              />
            </div>
          )}

          {/* Content */}
          <p className="text-lg leading-relaxed">{news.content}</p>
        </div>
      </section>
      <Footer />
    </>
  );
}
