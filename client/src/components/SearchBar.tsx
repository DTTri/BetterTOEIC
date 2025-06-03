// This is just a stub code (mock code)
import SearchIcon from "@mui/icons-material/Search";
export default function SearchBar(
  {
    onSearch
  } : {
    onSearch: (searchText: string) => void;
  }
) {
  return (
    <div className="group flex items-center w-[40%] bg-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out border-2 border-transparent focus-within:ring-2 focus-within:ring-primary/50">
      <input
        type="text"
        placeholder="Search..."
        className="flex-grow px-5 py-3 text-gray-700 placeholder-gray-400 bg-transparent border-none rounded-l-full outline-none focus:ring-0 text-base"
        onChange={(e) => {
          console.log(e.target.value);
          onSearch(e.target.value);
        }}
      />
      <button
        type="button"
        aria-label="Search"
        className="p-3 text-gray-500 rounded-r-full group-hover:text-primary transition-colors duration-300 ease-in-out focus:outline-none focus:text-primary"
        onClick={(e) => {
          e.preventDefault();
          const input = e.currentTarget.previousElementSibling as HTMLInputElement;
          if (input) {
            onSearch(input.value);
          }
        }}
      >
        <SearchIcon className="w-6 h-6" />
      </button>
    </div>
  );
}
