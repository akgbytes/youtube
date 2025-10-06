import { SearchIcon } from "lucide-react";

const SearchInput = () => {
  return (
    <form className="flex w-full max-w-[600px]">
      <div className="relative w-full">
        <input
          type="search"
          placeholder="Search"
          className="w-full pl-4 py-2 pr-12 border rounded-l-full focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Add dark mode styling later */}
      <button
        type="submit"
        className="px-5 py-2.5 bg-gray-100 border border-l-0 rounded-r-full hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <SearchIcon className="size-5" />
      </button>
    </form>
  );
};

export default SearchInput;
