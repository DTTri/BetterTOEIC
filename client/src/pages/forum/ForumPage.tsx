import MustRead from "@/components/forum/MustRead";
import PostComponent from "@/components/forum/PostComponent";
import PostSearchBar from "@/components/forum/PostSearchBar";
import PostSharing from "@/components/forum/PostSharing";
import LoadingProgress from "@/components/LoadingProgress";
import Post from "@/entities/Post";
import sForum from "@/store/forumStore";
import { useEffect, useState } from "react";

export default function ForumPage() {
  const forumStore = sForum.use(cur => cur.posts);
  const [posts, setPosts] = useState<Post[]>(forumStore);

  useEffect(() => {
    if(forumStore.length > 0) {
      setPosts(forumStore);
    }
  }, [forumStore]);

  if(!posts) {
    return <LoadingProgress />
  }
  return (
    <div className="flex flex-row w-full">
      <PostSearchBar />
      <div className="content-post flex flex-col py-10 px-9 w-[70%] gap-6">
        <PostSharing />
        {posts.map((post) => (
          <PostComponent key={post._id} post={post} />))}
      </div>
      <div className="py-10 px-5 pl-1 gap-7 w-[30%]">
        <MustRead/>
      </div>
    </div>
  );
}
