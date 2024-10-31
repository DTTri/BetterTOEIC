import { Avatar } from '@mui/material'
import React, { useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';

function CommentOptions() {
    return (
        <div className=" absolute top-9 right-[-8px] bg-[#fffafa] shadow-lg rounded-[15px] transition-transform duration-200 ease-out">
            <div className="w-[200px] flex flex-col">
                <div className="hover:bg-slate-100 text-sm p-2 cursor-pointer">Edit</div>
                <div className="hover:bg-slate-100 text-sm p-2 cursor-pointer">Delete</div>
                <div className="hover:bg-slate-100 text-sm p-2 cursor-pointer">Update</div>
            </div>
        </div>
    )
}

export default function Comment() {
  const [showOptions, setShowOptions] = useState(false);
  return (
    <div className='shadow-md max-w-[700px] w-full bg-[#fff] py-6 px-7 rounded-[15px]'>
        <div className="relative first w-full flex flex-row items-center mb-3">
            <Avatar style={{ width: '40px', height: '40px'}} alt='avatar' src='https://www.w3schools.com/howto/img_avatar.png' />
            <div className="flex-1 flex flex-col ml-2">
                <h1 className="text-[15px] font-semibold">Nguyen Van A</h1>
                <span className="text-gray-400 text-[13px]">2 hours ago</span>
            </div>
            <MoreVertIcon onClick={() => setShowOptions(!showOptions)} className="text-gray-400 cursor-pointer hover:bg-slate-100"/>
            {showOptions && <CommentOptions />}
        </div>
        <div className="content mb-3">
            <p className="text-[14px] text-[#000] font-light ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem a recusandae, id ullam consequuntur assumenda. Sint eaque excepturi molestiae velit ipsum amet architecto? Vel aut modi impedit praesentium asperiores nesciunt.</p>
        </div>
        <div className="react flex flex-row items-center gap-6">
            <div className="flex flex-row items-center gap-1">
                <FavoriteBorderIcon style={{ width: '20px', height: '18px'}} className="cursor-pointer hover:text-red-500"/>
                <span className="text-[#202224] font-bold text-sm">10</span>
            </div>
            <div className="flex flex-row items-center gap-1">
                <CommentIcon style={{ width: '20px', height: '18px'}} className="cursor-pointer hover:text-red-500"/>
                <span className="text-[#202224] font-bold text-sm">10</span>
            </div>
        </div>
    </div>
  )
}
