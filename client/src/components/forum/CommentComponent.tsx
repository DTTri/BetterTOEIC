import { Avatar } from "@mui/material";
import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import { Comment } from "@/entities";

function CommentOptions({
  onDelete,
  onEdit,
}: {
  onDelete: () => void;
  onEdit: () => void;
}) {
  return (
    <div className=" absolute top-9 right-[-8px] bg-[#fffafa] shadow-lg rounded-[15px] transition-transform duration-200 ease-out">
      <div className="w-[200px] flex flex-col">
        <div
          onClick={onEdit}
          className="hover:bg-slate-100 text-sm p-2 cursor-pointer"
        >
          Edit
        </div>
        <div
          onClick={onDelete}
          className="hover:bg-slate-100 text-sm p-2 cursor-pointer"
        >
          Delete
        </div>
      </div>
    </div>
  );
}

export default function CommentComponent({
  onLike,
  onDelete,
  userId,
  comment,
}: {
  onLike: (isLike: boolean, commentId: string) => void;
  userId: string;
  onDelete: (commentId: string) => void;
  comment: Comment;
}) {
  console.log("comment in Comp" + comment.content);
  const [showOptions, setShowOptions] = useState(false);
  const [isLiked, setIsLiked] = useState(() => {
    const findComment = comment.totalLike.find((item) => item === userId);
    return findComment ? true : false;
  });
  const handleOnLike = () => {
    onLike(!isLiked, comment._id);
    setIsLiked(!isLiked);
  };

  return (
    <div className="shadow-md max-w-[750px] w-full bg-[#fff] py-6 px-7 rounded-[15px]">
      <div className="relative first w-full flex flex-row items-center mb-3">
        <Avatar
          style={{ width: "40px", height: "40px" }}
          alt="avatar"
          src="https://www.w3schools.com/howto/img_avatar.png"
        />
        <div className="flex-1 flex flex-col ml-2">
          <h1 className="text-[15px] font-semibold">
            {comment.creator.username}
          </h1>
          <span className="text-gray-400 text-[13px]">
            {new Date(comment.created_at).toLocaleString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
            , {new Date(comment.created_at).toLocaleDateString()}
          </span>
        </div>
        <MoreVertIcon
          onClick={() => setShowOptions(!showOptions)}
          className="text-gray-400 cursor-pointer hover:bg-slate-100"
        />
        {showOptions && (
          <CommentOptions
            onDelete={() => onDelete(comment._id)}
            onEdit={() => {
              console.log("edit comment");
            }}
          />
        )}
      </div>
      <div className="content mb-3 ml-[5px]">
        <p className="text-[16px] text-[#000] font-medium ">
          {comment.content}
        </p>
      </div>
      <div className="react flex flex-row items-center gap-6 ml-1">
        <div className="flex flex-row items-center gap-1">
          <FavoriteBorderIcon
            style={{
              width: "20px",
              height: "18px",
              color: isLiked ? "red" : "",
            }}
            className="cursor-pointer hover:bg-zinc-100 rounded-full"
            onClick={handleOnLike}
          />
          <span className="text-[#202224] font-bold text-sm">
            {comment.totalLike.length}
          </span>
        </div>
      </div>
    </div>
  );
}
