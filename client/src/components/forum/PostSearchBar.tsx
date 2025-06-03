import SearchIcon from "@mui/icons-material/Search";
import { FormControl, MenuItem, Select } from "@mui/material";
import { motion } from 'motion/react';
import { useRef, useState } from "react";

//should be edited when call api from back-end

export default function PostSearchBar({
  searchPost,
  filterPost
}: {
  searchPost: (search: string) => void;
  filterPost: (baseOn: string, arrange: string) => void;
}) {
  const [arrange, setArrange] = useState<string>("created_at");
  const [sort, setSort] = useState<string>("down");
  const inpSearch = useRef("");

  const handleSearch = () => {
    searchPost(inpSearch.current);
  };

  const handleArrageByChange = (event: any) => {
    const newArrageBy = event.target.value as string;
    setArrange(newArrageBy);
    filterPost(newArrageBy, sort);
  };

  const handleSortByChange = (event: any) => {
    const newSortBy = event.target.value as string;
    setSort(newSortBy);
    filterPost(arrange, sort);
  };
  return (
    <div className="max-w-[300px] w-full items-center flex-col bg-[#fff] p-5">
      <div className="search">
        <h4 className="text-[#202224] font-semibold mb-[10px]">Search Posts</h4>
        <div className="py-2 px-2 flex justify-between items-center border-2 border-gray-300 bg-[#F6F6F6] rounded-lg w-full mb-[10px] focus-within:border-black">
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => (inpSearch.current = e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();  
              }
            }}
            className=" outline-none w-full h-6 bg-[#F6F6F6] focus:ring-0 focus:border-none focus:outline-none"
          />
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <button
              type="button"
              aria-label="Search"
              className="text-gray-600 rounded-full hover:text-primary transition-colors duration-200 ease-in-out focus:outline-none focus:text-primary"
              onClick={handleSearch}
            >
              <SearchIcon className="w-6 h-6" />
            </button>
          </motion.div>
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
            onChange={handleArrageByChange}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value={"created_at"}>Created Date</MenuItem>
            <MenuItem value={"totalLike"}>Popularity</MenuItem>
            <MenuItem value={"comments"}>Comment</MenuItem>
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
            onChange={handleSortByChange}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value={"down"}>Descending</MenuItem>
            <MenuItem value={"up"}>Ascending</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
}
