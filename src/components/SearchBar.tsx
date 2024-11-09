import { ChangeEvent } from "react";

type TSearch = {
  search: string;
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
  clearSearch: () => void;
};

const SearchBar: React.FC<TSearch> = ({
  search,
  onSearchChange,
  clearSearch,
}) => {
  return (
    <div className="border flex p-2 px-4 border-gray-300 my-4 rounded">
      <input
        className="w-full focus:outline-none outline-none"
        type="text"
        placeholder="Search for products..."
        value={search}
        onChange={onSearchChange}
      />
      <button onClick={clearSearch}>X</button>
    </div>
  );
};

export default SearchBar;
