import MustRead from "@/components/forum/MustRead";
import PostComponent from "@/components/forum/PostComponent";
import PostSearchBar from "@/components/forum/PostSearchBar";
import PostSharing from "@/components/forum/PostSharing";
import LoadingProgress from "@/components/LoadingProgress";
import Post from "@/entities/Post";
import { sUser } from "@/store";
import sForum from "@/store/forumStore";
import { useEffect, useState } from "react";

export default function ForumPage() {
  const forumStore = sForum.use((cur) => cur.posts);
  const user = sUser.use((cur) => cur.info);
  const [posts, setPosts] = useState<Post[]>(forumStore);

  useEffect(() => {
    if(forumStore.length > 0) {
      setPosts(forumStore);
    }
  }, [forumStore]);

  if (!posts || !user) {
    return <LoadingProgress />;
  }

  const searchPost = (search: string) => {
    if(search === '' ){
      setPosts(forumStore);
    }
    setPosts(posts.filter((post) => post.content.includes(search)));
  }

  const filterPost = (baseOn: string, arrange: string) => {
    if(arrange === 'up'){
      if(baseOn === 'totalLike' || baseOn === 'comments') {
        setPosts(posts.sort((a, b) => a[baseOn].length - b[baseOn].length));
      }
      else{
        setPosts(posts.sort((a, b) => new Date(a['created_at']).getTime() - new Date(b['created_at']).getTime()));
      }
    } else {
      if(baseOn === 'totalLike' || baseOn === 'comments') {
        setPosts(posts.sort((a, b) => b[baseOn].length - a[baseOn].length));
      }
      else{
        setPosts(posts.sort((a, b) => new Date(b['created_at']).getTime() - new Date(a['created_at']).getTime()));
      }
    }
  }


  return (
    <div className="min-h-screen h-full flex flex-row w-full">
      <PostSearchBar  filterPost={filterPost} searchPost={searchPost}/>
      <div className="content-post flex flex-col py-10 px-9 w-[70%] gap-6">
        <PostSharing />
        {posts.map((post) => (
            <PostComponent userInfo={user._id} key={post._id} post={post} />
        ))}
      </div>
      <div className="py-10 px-5 pl-1 gap-7 w-[30%]">
        <MustRead />
      </div>
    </div>
  );
}
