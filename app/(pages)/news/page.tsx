import { Metadata } from "next";
import axios from "axios";
import NewsPageClient from "./NewsPageClient";
import Header from "@/app/components/layout/Header/Header";
import Footer from "@/app/components/layout/Footer/Footer";

// Define News Type
interface News {
  id: number;
  title: string;
  content?: string;
  comments_enabled: number;
  created_at: string;
  author_first_name: string;
  author_last_name: string;
}

// Define metadata for SEO
export const metadata: Metadata = {
  title: "اخبار | Your Site Name",
  description: "آخرین اخبار و اطلاعیه‌های مهم",
  openGraph: {
    title: "اخبار | Your Site Name",
    description: "آخرین اخبار و اطلاعیه‌های مهم",
    type: "website",
  },
};

// Async function to fetch news data server-side
async function fetchNewsData(page: number, perPage: number) {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVICE_URL}/blog?page=${page}&per_page=${perPage}`
  );

  if (response.status !== 200) {
    throw new Error("Failed to fetch news data");
  }

  const data = await response.data;
  return {
    news: data.data,
    total: data.total,
    page,
    perPage,
  };
}

// Server Component
export default async function NewsPage() {
  const {
    news: initialNews,
    total,
    page,
    perPage,
  } = await fetchNewsData(1, 10);

  return (
    <>
      <Header />
      <NewsPageClient
        initialNews={initialNews}
        total={total}
        page={page}
        perPage={perPage}
      />
      <Footer />
    </>
  );
}
