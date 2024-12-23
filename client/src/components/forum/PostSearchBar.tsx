import SearchIcon from "@mui/icons-material/Search";
import { FormControl, MenuItem, Select } from "@mui/material";
import { useRef, useState } from "react";

//should be edited when call api from back-end

export default function PostSearchBar({
  searchPost,
  filterPost
}: {
  searchPost: (search: string) => void;
  filterPost: (baseOn: string, arrange: string) => void;
}) {
  const [arrange, setArrange] = useState<string>("Ngày tạo");
  const [sort, setSort] = useState<string>("Giảm dần");
  const inpSearch = useRef("");
  return (
    <div className="max-w-[330px] w-full items-center flex-col bg-[#fff] py-5 px-7">
      <div className="search">
        <h4 className="text-[#202224] font-semibold mb-[10px]">Search Posts</h4>
        <div className="py-2 px-2 flex justify-between items-center border border-gray-300 bg-[#F6F6F6] rounded-xl w-full mb-[10px] focus-within:border-blue-500">
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => (inpSearch.current = e.target.value)}
            className=" outline-none w-full h-6 bg-[#F6F6F6] focus:ring-0 focus:border-none focus:outline-none"
          />
          <button className="rounded-full hover:bg-slate-200" onClick={() => {
            console.log(inpSearch.current);
            searchPost(inpSearch.current);

          }}>
            <SearchIcon className="w-3 h-3 cursor-pointer" />
          </button>
        </div>
      </div>
      <div className="arrange mb-[10px]">
        <h4 className="text-[#202224] font-semibold mb-[10px]">Order By</h4>
        <FormControl
          style={{
            width: "100%",
            height: "36px",
            backgroundColor: "#F6F6F6",
            borderColor: "transparent",
          }}
        >
          <Select
            style={{
              width: "100%",
              height: "36px",
              backgroundColor: "#F6F6F6",
              borderColor: "transparent",
            }}
            displayEmpty
            value={arrange}
            onChange={(e) => {
              setArrange(e.target.value);
            }}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value={"created_at"}>Created Date</MenuItem>
            <MenuItem value={"totalLike"}>Interactions</MenuItem>
            <MenuItem value={"comments"}>Comments</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="sort mb-[10px]">
        <h4 className="text-[#202224] font-semibold mb-[10px]">
          Sort By
        </h4>
        <FormControl
          style={{
            width: "100%",
            height: "36px",
            backgroundColor: "#F6F6F6",
            borderColor: "transparent",
          }}
        >
          <Select
            style={{
              width: "100%",
              height: "36px",
              backgroundColor: "#F6F6F6",
              borderColor: "transparent",
            }}
            displayEmpty
            value={sort}
            onChange={(e) => {
              filterPost(arrange, e.target.value);
              setSort(e.target.value);
            }}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value={"down"}>Increasing</MenuItem>
            <MenuItem value={"up"}>Decreasing</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
}
