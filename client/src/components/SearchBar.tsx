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
    <div className="p-2 flex justify-between items-center border-2 bg-white border-primary rounded-3xl w-[40%]">
      <input
        type="text"
        placeholder="Search..."
        className="border-none outline-none w-full h-6"
        onChange={(e) => {
          console.log(e.target.value);
          onSearch(e.target.value);
        }}
      />
      <button>
        <SearchIcon />
      </button>
    </div>
  );
}
