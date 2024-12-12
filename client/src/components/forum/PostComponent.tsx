import { Avatar } from "@mui/material";
import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import { Post } from "@/entities";
import { Link } from "react-router-dom";
import LoadingProgress from "../LoadingProgress";


export default function PostComponent({ userInfo, post }: { userInfo: string, post: Post }) {
  const isLiked = post.totalLike.find((item) => item === userInfo);
  return (
    <Link
      to={`/post-detail/${post._id}`}
      className="relative shadow-md max-w-[750px] py-6 px-7 w-full bg-[#fff] rounded-[15px]"
    >
      <div className="first w-full flex flex-row items-center mb-4">
        <Avatar
          style={{ width: "45px", height: "45px" }}
          alt="avatar"
          src={post.creator.avatar}
        />
        <div className="flex-1 flex flex-col ml-2">
          <h2 className="text-[18px] font-semibold">{post.creator.username}</h2>
            <span className="text-[14px] font-medium">
            {new Date(post.created_at).toLocaleString([], { hour: '2-digit', minute: '2-digit', hour12: true })}, {new Date(post.created_at).toLocaleDateString()}
            </span>
        </div>
      </div>
      <div className="content mb-4">
        <p
          className="overflow-hidden text-ellipsis text-nowrap text-[16px] text-[#000] font-normal "
          style={{ WebkitLineClamp: "1" }}
        >
          {post.content}
        </p>
        <div className="images w-full overflow-auto flex flex-row gap-3 mt-2">
          {post.contentImage.map((image, index) => (
            <img key={index} src={image} alt='image' className="w-[120px] h-[120px] object-cover rounded-[6px] hover:shadow-gray-800 cursor-pointer"/>)
          )}
        </div>
      </div>
      <div className="react flex flex-row items-center gap-6">
        <div className="flex flex-row items-center gap-1">
          <FavoriteBorderIcon
            style={{
              width: "22px",
              height: "20px",
              color: isLiked ? "red" : "",
            }}
          />
          <span className="text-[#202224] font-bold text-sm">
            {post.totalLike.length}
          </span>
        </div>
        <div className="flex flex-row items-center gap-1">
          <CommentIcon
            style={{ width: "20px", height: "18px" }}
            className="cursor-pointer hover:text-red-500"
          />
          <span className="text-[#202224] font-bold text-sm">
            {post.comments.length}
          </span>
        </div>
      </div>
    </Link>
  );
}
