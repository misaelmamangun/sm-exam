type TPagination = {
  current: number;
  total: number;
  handlePageChange: (page: number) => void;
};

const Pagination: React.FC<TPagination> = ({
  current,
  total,
  handlePageChange,
}) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center items-center mt-8 mb-4">
      <button
        className="px-4 py-2 text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        disabled={current === 1}
        onClick={() => handlePageChange(total - 1)}
      >
        {"<"}
      </button>
      {Array.from({ length: total }, (_, index) => index + 1).map((page) => (
        <button
          className="px-4 py-2 text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          key={page}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      ))}
      <button
        className="px-4 py-2 text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        disabled={current === total}
        onClick={() => handlePageChange(current + 1)}
      >
        {">"}
      </button>
    </div>
  );
};

export default Pagination;
