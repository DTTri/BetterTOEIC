import Comment from "@/components/forum/CommentComponent";
import CommentCreating from "@/components/forum/CommentCreating";
import MustRead from "@/components/forum/MustRead";
import PostComponent from "@/components/forum/PostComponent";
import PostDetail from "@/components/forum/PostDetail";
import PostSearchBar from "@/components/forum/PostSearchBar";
import LoadingProgress from "@/components/LoadingProgress";
import { Post } from "@/entities";
import CreateCommentDTO from "@/entities/DTOS/CreateCommentDTO";
import { forumService } from "@/services";
import { sUser } from "@/store";
import sForum from "@/store/forumStore";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function PostDetailPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const postLists = sForum.use((cur) => cur.posts);
  const [post, setPost] = useState<Post>(
    postLists.find((post) => post._id === id) || postLists[0]
  );
  const user = sUser.use((cur) => cur.info);

  useEffect(() => {
    if (postLists.length > 0) {
      setPost(postLists.find((post) => post._id === id) || postLists[0]);
    }
  }, [postLists]);
  
  if (!post) {
    return <LoadingProgress />;
  }
  console.log("post in detail page" + post);
  console.log("post comments" + post.comments);

  const handleOnLikePost = async (isLiked: boolean) => {
    try {
      const response = await forumService.likePost(post._id, isLiked);
      if (response.EC === 0) {
        const newLike = isLiked ? post.totalLike + 1 : post.totalLike - 1
        setPost({ ...post, totalLike: newLike });
      }
    } catch (error) {
      console.log("Fail to like post");
    }
  };
  const handleDeletePost = async () => {
    try {
      const response = await forumService.deletePost(post._id);
      if (response.EC === 0) {
        setTimeout(() => {
          nav("/forum");
        }, 1000);
      }
    } catch (error) {
      console.log("Fail to delete post");
    }
  }

  const handleOnLikeComment = async (isLiked: boolean, commentId: string) => {
    try {
      const response = await forumService.likeComment(post._id, commentId, isLiked);
      if (response.EC === 0) {
        const commentIndex = post.comments.findIndex(comment => comment._id === commentId);
        const newLike = isLiked ? post.comments[commentIndex].totalLike + 1 : post.comments[commentIndex].totalLike - 1;
        setPost({ ...post, comments: post.comments.map((comment, index) => index === commentIndex ? { ...comment, totalLike: newLike } : comment) });
      }
    } catch (error) {
      console.log("Fail to like post");
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      const response = await forumService.deleteComment(post._id, commentId);
      if (response.EC === 0) {
        setPost({ ...post, comments: post.comments.filter(comment => comment._id !== commentId) });
      }
    } catch (error) {
      console.log("Fail to delete comment");
    }
  }

  const handleOnComment = async (content: string) => {
    const CreateComment: CreateCommentDTO = {
      content: content,
      creator: {
        _id: user._id,
        username: user.name,
        avatar: user.avatar,
      }
    }
    try {
      const response = await forumService.createComment(post._id, CreateComment);
      if (response.EC === 0) {
        setPost({ ...post, comments: [...post.comments, response.DT] });
      }
    } catch (error) {
      console.log
    }
  };

  return (
    <div className="flex flex-row w-full">
      <PostSearchBar />
      <div className="content-post flex flex-col py-10 px-9 w-[70%] gap-4">
        <PostDetail onDelete={handleDeletePost} onLike={handleOnLikePost} post={post} />
        <CommentCreating onCommentCreated={handleOnComment}/>
        {post?.comments.map((comment, index) => (
          <Comment onDelete={handleDeleteComment} onLike={handleOnLikeComment} key={index} comment={comment} />
        ))}
      </div>
      <div className="py-10 px-5 pl-1 gap-7 w-[30%]">
        <MustRead />
      </div>
    </div>
  );
}
