import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import ImageModal from "./ImageModal";
import { Post } from "@/entities";
import { useParams } from "react-router-dom";
import { sUser } from "@/store";
import LoadingProgress from "../LoadingProgress";
import { Item } from "@radix-ui/react-select";

function PostOptions(
    { onDelete, onEdit } : { 
        onDelete: () => void,
        onEdit: () => void
     }
) {
  return (
    <div className=" absolute top-9 right-[-8px] bg-[#fffafa] shadow-lg rounded-[15px] transition-transform duration-200 ease-out">
      <div className="w-[200px] flex flex-col">
        <div onClick={onEdit} className="hover:bg-slate-100 text-sm p-2 cursor-pointer">
          Edit
        </div>
        <div onClick={onDelete} className="hover:bg-slate-100 text-sm p-2 cursor-pointer">
          Delete
        </div>
      </div>
    </div>
  );
}

export default function PostDetail( { post
    , onLike, onDelete
 } : { post: Post,
    onLike: (isLiked: boolean) => void,
    onDelete: () => void
  }) {
  const { id } = useParams();
//   const postLists = sForum.use((cur) => cur.posts);
//   const [post, setPost] = useState<Post>();
  const userId = sUser.use((cur) => cur.info._id);
  if(!post || !userId) {
    return <LoadingProgress />
  }
  const [showOptions, setShowOptions] = useState(false);
  const [image, setImage] = useState("");

  const [isLiked, setIsLiked] = useState(() => {
    const findPost =  post.totalLike.find(item => item === userId);
    return findPost ? true : false;
  });
  
  const handleOnLike = () => {
    console.log("isLiked in Comp" + isLiked);
    onLike(!isLiked);
    setIsLiked(!isLiked);
  }

  return (
    <div className="shadow-md max-w-[750px] py-10 px-11 w-full bg-[#fff]  rounded-[15px]">
      <div className="relative first w-full flex flex-row items-center mb-4">
        <Avatar
          style={{ width: "45px", height: "45px" }}
          alt="avatar"
          src={post.creator.avatar}
        />
        <div className="flex-1 flex flex-col ml-2">
          <h1 className="text-[16px] font-semibold">{post.creator.username}</h1>
          <span className="text-[14px] font-medium">
            {new Date(post.created_at).toLocaleString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
            , {new Date(post.created_at).toLocaleDateString()}
          </span>
        </div>
        {userId === post.creator._id && (
          <MoreVertIcon
            onClick={() => setShowOptions(!showOptions)}
            className="text-gray-400 cursor-pointer hover:bg-slate-100"
          />
        )}
        {showOptions && 
            <PostOptions
                onDelete={onDelete}
                onEdit={() => console.log('Edit')}
            />}
      </div>
      <div className="content mb-4">
        <p className="text-[16px] text-[#000] font-normal ">{post.content}</p>
      </div>
      <div className="images w-full overflow-auto flex flex-row gap-3 mb-4">
        {post.contentImage.map((image, index) => (
          <img
            key={index}
            src={image}
            alt="image"
            className="w-[120px] h-[120px] object-cover rounded-[6px] hover:shadow-gray-800 cursor-pointer hover:scale-90 transition-all"
            onClick={() => setImage(image)}
          />
        ))}
      </div>
      <div className="react flex flex-row items-center gap-6">
        <div className="flex flex-row items-center gap-1">
          <FavoriteBorderIcon
            style={{
              width: "22px",
              height: "20px",
              color: isLiked ? "red" : "",
            }}
            onClick={handleOnLike}
            className="cursor-pointer hover:bg-zinc-100 rounded-full"
          />
          <span className="text-[#202224] font-bold text-sm">
            {post.totalLike.length}
          </span>
        </div>
        <div className="flex flex-row items-center gap-1">
          <CommentIcon
            style={{ width: "22px", height: "20px" }}
            className="hover:text-red-500"
          />
          <span className="text-[#202224] font-bold text-sm">
            {post.comments.length}
          </span>
        </div>
      </div>
      {image !== "" && <ImageModal src={image} onClose={() => setImage("")} />}
    </div>
  );
}
