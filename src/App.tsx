import {
  ChangeEvent,
  useCallback,
  useDeferredValue,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import TableList from "./components/TableList";
import Pagination from "./components/Pagination";

export type Product = {
  id: number | string;
  title: string;
  description: string;
  catergory: string;
  thumbnail: string;
  price: number;
  images: string[];
  brand: string;
  [key: string]: string | number | boolean | string[];
};

type TPagination = {
  current: number;
  items: number;
  total: number;
};

const App: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [text, setText] = useState<string | null>("Loading...");
  const [pagination, setPagination] = useState<TPagination>({
    current: 1,
    items: 10,
    total: 0,
  });
  const deferredSearch = useDeferredValue(search);
  const { current, items } = pagination;

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText("Searching...");
    setSearch(e.target.value);
    resetPage();
  };

  const resetPage = () => {
    setProducts([]);
    setPagination((prevPagination) => ({
      ...prevPagination,
      current: 1,
    }));
  };

  const clearSearch = () => {
    setSearch("");
    setText("Loading...");
    resetPage();
  };

  const handlePageChange = (page: number) => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      current: page,
    }));
  };

  const fetchProduct = useCallback(async () => {
    setProducts([]);
    if (deferredSearch.length === 0) {
      setText("Loading...");
    }
    try {
      const res = await axios.get("https://dummyjson.com/products/search", {
        params: {
          skip: (current - 1) * items,
          limit: items,
          q: deferredSearch,
        },
      });
      if (deferredSearch.length !== 0 && res.data.products.length === 0) {
        setProducts([]);
        setText("No Product Found");
      } else {
        setText(null);
        setProducts(res.data.products);
        setPagination((prevPagination) => ({
          ...prevPagination,
          total: res.data.total,
        }));
      }
    } catch (e) {
      console.log("Error: ", e);
    }
  }, [deferredSearch, current, items]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const getPaginatedItems = () => {
    return products;
  };
  const paginatedItems = getPaginatedItems();
  const totalPages = Math.ceil(pagination.total / pagination.items);
  return (
    <div className="container w-[80%] mx-auto px-4">
      <div className="text-center">
        <h1 className="text-4xl">Product Table</h1>
        <h2 className="text-xl font-bold uppercase p-2 bg-blue-400">
          Products Demo
        </h2>
      </div>
      <SearchBar
        search={deferredSearch}
        onSearchChange={handleSearchChange}
        clearSearch={clearSearch}
      />

      <h1>{text}</h1>

      {products && products.length ? (
        <>
          <TableList name={"products"} items={paginatedItems} />
          <Pagination
            current={pagination.current}
            total={totalPages}
            handlePageChange={handlePageChange}
          />
        </>
      ) : null}
    </div>
  );
};

export default App;
