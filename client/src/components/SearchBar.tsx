// This is just a stub code (mock code)
import SearchIcon from "@mui/icons-material/Search";
export default function SearchBar() {
  return (
    <div className="p-2 flex justify-between items-center border-2 bg-white border-primary rounded-3xl">
      <input
        type="text"
        placeholder="Search..."
        className="border-none outline-none w-full"
      />
      <button>
        <SearchIcon />
      </button>
    </div>
  );
}
