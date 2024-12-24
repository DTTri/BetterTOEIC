import MustRead from "@/components/forum/MustRead";
import PostComponent from "@/components/forum/PostComponent";
import PostSearchBar from "@/components/forum/PostSearchBar";
import PostSharing from "@/components/forum/PostSharing";
import LoadingProgress from "@/components/LoadingProgress";
import Post from "@/entities/Post";
import { sUser } from "@/store";
import sForum from "@/store/forumStore";
import { useEffect, useState } from "react";
import { LazyMotion, domAnimation } from "motion/react";
import * as motion from "motion/react-client";

export default function ForumPage() {
  const forumStore = sForum.use((cur) => cur.posts);
  const user = sUser.use((cur) => cur.info);
  const [posts, setPosts] = useState<Post[]>(forumStore);

  useEffect(() => {
    if (forumStore.length > 0) {
      setPosts(forumStore);
    }
  }, [forumStore]);

  if (!posts || !user) {
    return <LoadingProgress />;
  }

  const searchPost = (search: string) => {
    console.log(search);
    if (search === "") {
      setPosts(forumStore);
    }
    setPosts(forumStore.filter((post) => post.content.includes(search)));
  };

  const filterPost = (baseOn: string, arrange: string) => {
    console.log(baseOn, arrange);
    let sortedPosts = [...forumStore]; // Create a new array

    if (arrange === "up") {
      if (baseOn === "totalLike" || baseOn === "comments") {
        sortedPosts.sort((a, b) => a[baseOn].length - b[baseOn].length);
      } else {
        sortedPosts.sort(
          (a, b) =>
            new Date(a["created_at"]).getTime() -
            new Date(b["created_at"]).getTime()
        );
      }
    } else {
      if (baseOn === "totalLike" || baseOn === "comments") {
        sortedPosts.sort((a, b) => b[baseOn].length - a[baseOn].length);
      } else {
        sortedPosts.sort(
          (a, b) =>
            new Date(b["created_at"]).getTime() -
            new Date(a["created_at"]).getTime()
        );
      }
    }
    setPosts(sortedPosts);
  };

  return (
    <motion.div
      initial={{ opacity: 0, translateY: -50 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        duration: 0.35,
        scale: { type: "spring"},
        opacity: { ease: "easeInOut" },
      }}
    >
      <div className="min-h-screen h-full flex flex-row w-full">
        <PostSearchBar filterPost={filterPost} searchPost={searchPost} />
        <div className="content-post flex flex-col py-10 px-9 w-[70%] gap-6">
          <PostSharing />
          <LazyMotion features={domAnimation} strict>
            {posts.map((post) => (
              <PostComponent userInfo={user._id} key={post._id} post={post} />
            ))}
          </LazyMotion>
        </div>
        <div className="py-10 px-5 pl-1 gap-7 w-[30%]">
          <MustRead postLists={forumStore} />
        </div>
      </div>
    </motion.div>
  );
}
