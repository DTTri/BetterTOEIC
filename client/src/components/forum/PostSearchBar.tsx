import { Button, FormControl, Menu, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { title } from "process";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

//should be edited when call api from back-end

export default function PostSearchBar() {
  const [update, setUpdate] = useState<number>(0);
  const [arrange, setArrange] = useState<string>('Ngày tạo');
  const [sort, setSort] = useState<string>('Giảm dần');
  return (
    <div className="max-w-[330px] w-full items-center flex-col bg-[#fff] h-screen py-5 px-7">
      <div className="search">
      <h4 className="text-[#202224] font-semibold mb-[10px]">Tìm kiếm</h4>
      <div className="py-2 px-2 flex justify-between items-center border-1 bg-[#F6F6F6] rounded-xl w-full mb-[10px]">
        <input
          type="text"
          placeholder="Search..."
          className="border-none outline-none w-full h-6 bg-[#F6F6F6]"
        />
        <button>
          <SearchIcon />
        </button>
      </div>
      </div>
      <div className="Update mb-[10px]">
        <h4 className="text-[#202224] font-semibold mb-[10px]">Cập nhật mới nhất</h4>
        <FormControl style={ { width: "100%", height: "36px", backgroundColor: "#F6F6F6",  borderColor: "transparent"  } }>
            <Select 
            style={ { width: "100%", height: "36px", backgroundColor: "#F6F6F6", borderColor: "transparent"  } }
            displayEmpty
            value={update}
            onChange={(e) => {
                setUpdate(Number(e.target.value));
            }}
            inputProps={{ 'aria-label': 'Without label' }}
            >
            <MenuItem value={7}>7 ngày</MenuItem>
            <MenuItem value={20}>20 ngày</MenuItem>
            <MenuItem value={30}>1 tháng</MenuItem>
            <MenuItem value={90}>3 tháng</MenuItem>
            <MenuItem value={365}>1 năm</MenuItem>
            <MenuItem value={0}>Tất cả</MenuItem>
            </Select>
        </FormControl>
      </div>
      
      <div className="arrange mb-[10px]">
        <h4 className="text-[#202224] font-semibold mb-[10px]">Sắp xếp theo</h4>
        <FormControl style={ { width: "100%", height: "36px", backgroundColor: "#F6F6F6",  borderColor: "transparent"  } }>
            <Select 
            style={ { width: "100%", height: "36px", backgroundColor: "#F6F6F6", borderColor: "transparent"  } }
            displayEmpty
            value={arrange}
            onChange={(e) => {
                setArrange(e.target.value);
            }}
            inputProps={{ 'aria-label': 'Without label' }}
            >
            <MenuItem value={'Ngày tạo'}>Ngày tạo</MenuItem>
            <MenuItem value={'Lượt tương tác'}>Lượt tương tác</MenuItem>
            <MenuItem value={'Bình luận'}>Bình luận</MenuItem>
            </Select>
        </FormControl>
      </div>
      <div className="sort mb-[10px]">
        <h4 className="text-[#202224] font-semibold mb-[10px]">Cập nhật mới nhất</h4>
        <FormControl style={ { width: "100%", height: "36px", backgroundColor: "#F6F6F6",  borderColor: "transparent"  } }>
            <Select 
            style={ { width: "100%", height: "36px", backgroundColor: "#F6F6F6", borderColor: "transparent"  } }
            displayEmpty
            value={sort}
            onChange={(e) => {
                setSort(e.target.value);
            }}
            inputProps={{ 'aria-label': 'Without label' }}
            >
            <MenuItem value={'Giảm dần'}>Giảm dần</MenuItem>
            <MenuItem value={'Tăng dần'}>Tăng dần</MenuItem>
            </Select>
        </FormControl>
      </div>
    </div>
  );
}
