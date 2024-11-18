import { axiosInstance } from "@/app/api/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import CustomPagination from "../../Pagination/Pagination";
import NewsDetailedCard from "../../NewsDetailedCard/NewsDetailedCard";

interface News {
  id: number;
  title: string;
  content?: string;
}

export interface BlogResponse {
  total: number;
  page: number;
  data: News[];
}

const NewsList = () => {
  const [news, setNews] = useState<News[]>([]);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [perPage] = useState<number>(10);
  const [selectedBlogId, setSelectedBlogId] = useState<number | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchNews(page, perPage);
  }, [page]);

  const fetchNews = async (page: number, perPage: number) => {
    try {
      const response = await axiosInstance.get<BlogResponse>("/blog", {
        params: { page, per_page: perPage },
      });
      setNews(response.data.data);
      setTotal(response.data.total);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
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
    <div className="w-full rtl">
      {/* Description above the table */}
      <p className="mb-4 text-right text-sm text-gray-700 font-bold">
        برای مدیریت اخبار، لیست زیر را مرور کنید.
      </p>

      {/* News Table */}
      <div className="max-h-96 overflow-y-auto">
        <Table className="border-none rounded-2xl">
          <TableHeader className="bg-teal-100 rounded-t-lg hover:bg-teal-200">
            <TableRow>
              <TableHead className="text-start p-4">عنوان</TableHead>
              <TableHead className="text-start p-4">محتوا</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {news.length > 0 ? (
              news.map((item) => (
                <TableRow
                  key={item.id}
                  className="border-b last:border-none cursor-pointer hover:bg-gray-100"
                  onClick={() => handleRowClick(item.id)}
                >
                  <TableCell className="p-4 text-start">
                    {item.title}
                  </TableCell>
                  <TableCell className="p-4 text-start">
                    {item.content
                      ? `${item.content.substring(0, 50)}...`
                      : "-"}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2} className="p-4 text-center">
                  هیچ خبری موجود نیست.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <CustomPagination
        currentPage={page}
        totalCount={total}
        pageSize={perPage}
        onPageChange={handlePageChange}
      />

      {/* Blog Detail Card as Dialog */}
      {selectedBlogId && (
        <NewsDetailedCard
          blogId={selectedBlogId}
          isOpen={isDialogOpen}
          onClose={handleDialogClose}
        />
      )}
    </div>
  );
};

export default NewsList;
