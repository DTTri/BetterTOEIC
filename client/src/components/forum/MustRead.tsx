import { Post } from "@/entities";
import LinkIcon from "@mui/icons-material/Link";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Link } from "react-router-dom";
import LoadingProgress from "../LoadingProgress";

export default function MustRead({ postLists }: { postLists: Post[] }) {
  if (postLists.length === 0) {
    return <LoadingProgress />;
  }
  const sortedPosts = postLists.sort(
    (a, b) => b.totalLike.length - a.totalLike.length
  );
  const lastTwoPosts = postLists.slice(-2);
  return (
    <div className="w-full bg-[#fff] py-7 px-5 flex flex-col items-center rounded-[15px] gap-6">
      <div className="w-full ">
        <div className="flex flex-row items-center gap-3 py-2 border-b-[1px] mb-4">
          <StarBorderIcon
            style={{ width: "25px", height: "25px" }}
            className="text-[#FFD700]"
          />
          <h2 className="text-[20px] font-semibold">Must-read posts</h2>
        </div>
        <div className="flex flex-col gap-2">
          <ul
            className="px-5 text-[#1682FD] font-semibold text-[16px] line-clamp-1 overflow-hidden text-ellipsis text-nowrap"
            style={{ listStyleType: "disc" }}
          >
            {sortedPosts.slice(0, 2).map((post, index) => (
                <li key={index} className="hover:text-[#FE5507]">
                    <Link to={`/post-detail/${post._id}`} className="ellipsis">
                    {post.content}
                    </Link>
                </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="w-full ">
        <div className="flex flex-row items-center gap-3 py-2 border-b-[1px] mb-4">
          <LinkIcon
            style={{ width: "25px", height: "25px" }}
            className="text-[#FFD700]"
          />
          <h2 className="text-[20px] font-semibold">Feature links</h2>
        </div>
        <div className="flex flex-col gap-2">
          <ul
            className="px-5 text-[#1682FD] font-semibold text-[16px] line-clamp-1 overflow-hidden text-ellipsis text-nowrap"
            style={{ listStyleType: "disc" }}
          >
            {lastTwoPosts.map((post, index) => (
              <li key={index} className="hover:text-[#FE5507]">
                <Link to={`/post-detail/${post._id}`} className="ellipsis">
                  {post.content}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
