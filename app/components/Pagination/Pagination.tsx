import React from "react";

interface PaginationProps {
  currentPage: number;
  totalCount: number;
  pageSize: number;
  onPageChange: (newPage: number) => void;
}

const CustomPagination: React.FC<PaginationProps> = ({
  currentPage,
  totalCount,
  pageSize,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalCount / pageSize);

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="px-3 py-1 bg-gray-300 text-black hover:bg-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed rounded"
      >
        قبلی
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => onPageChange(index + 1)}
          className={`px-3 py-1 rounded ${
            currentPage === index + 1
              ? "bg-teal-500 text-white"
              : "bg-gray-300 text-black hover:bg-gray-400"
          }`}
        >
          {index + 1}
        </button>
      ))}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="px-3 py-1 bg-gray-300 text-black hover:bg-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed rounded"
      >
        بعدی
      </button>
    </div>
  );
};

export default CustomPagination;
