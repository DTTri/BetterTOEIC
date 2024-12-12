import CommentComp from "@/components/forum/CommentComponent";
import CommentCreating from "@/components/forum/CommentCreating";
import MustRead from "@/components/forum/MustRead";
import PostComponent from "@/components/forum/PostComponent";
import PostDetail from "@/components/forum/PostDetail";
import PostSearchBar from "@/components/forum/PostSearchBar";
import LoadingProgress from "@/components/LoadingProgress";
import { Comment, Post } from "@/entities";
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
  const [comments, setComments] = useState<Comment[]>(postLists.find((post) => post._id === id)?.comments || []);
  const user = sUser.use((cur) => cur.info);

  useEffect(() => {
    if (postLists.length > 0) {
      setPost(postLists.find((post) => post._id === id) || postLists[0]);
      setComments(postLists.find((post) => post._id === id)?.comments || []);
    }
  }, [postLists]);
  
  if (!post || !user) {
    return <LoadingProgress />;
  }

  const handleOnLikePost = async (isLiked: boolean) => {
    try {
      console.log("isLiked in Page" + isLiked);
      const response = await forumService.likePost(post._id, {
        isLike: isLiked,
        userId: user._id,
      });
      if (response.EC === 0) {
        setPost({ ...post, totalLike: response.DT === true ? [...post.totalLike, user._id] : post.totalLike.filter((id) => id !== user._id) });
        sForum.set((prev) => {
          return prev.value.posts.map((post) => post._id === post._id
          ? { ...post, totalLike: response.DT === true ? [...post.totalLike, user._id] : post.totalLike.filter((id) => id !== user._id) }
          : post);});
      }
    } catch (error) {
      console.log("Fail to like post");
    }
  };
  const handleDeletePost = async () => {
    try {
      const response = await forumService.deletePost(post._id);
      if (response.EC === 0) {
        sForum.set((prev) => {
          return prev.value.posts.filter(post => post._id !== post._id);
        });
        nav("/forum");
      }
    } catch (error) {
      console.log("Fail to delete post");
    }
  }

  const handleOnLikeComment = async (isLiked: boolean, commentId: string) => {
    try {
      const response = await forumService.likeComment(post._id, commentId, {
        isLike: isLiked,
        userId: user._id,
      });
      if (response.EC === 0) {
        setComments(comments.map((comment) => comment._id === commentId ? { ...comment, totalLike: response.DT === true ? [...comment.totalLike, user._id] : comment.totalLike.filter((id) => id !== user._id) } : comment));
        sForum.set((prev) => {
          return prev.value.posts.map((post) => post._id === post._id
          ? { ...post, comments: response.DT === true ?  post.comments.map((comment) => comment._id === commentId ? { ...comment, totalLike: [...comment.totalLike, user._id] } : comment) : post.comments.filter((comment) => comment._id !== commentId) }
          : post);
        });
      }
    } catch (error) {
      console.log("Fail to like post");
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      const response = await forumService.deleteComment(post._id, commentId);
      if (response.EC === 0) {
        setComments(comments.filter(comment => comment._id !== commentId));
        sForum.set((prev) => {
          return prev.value.posts.map((post) => post._id === post._id
          ? { ...post, comments: post.comments.filter(comment => comment._id !== commentId) }
          : post);
        });
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
        setComments([...comments, response.DT]);
        sForum.set((prev) => {
          return prev.value.posts.map((post) => post._id === post._id
          ? { ...post, comments: [...post.comments, response.DT] }
          : post);
        });
      }
    } catch (error) {
      console.log
    }
  };
  console.log("comment in post" + post.comments);
  return (
    <div className="flex flex-row w-full">
      <PostSearchBar />
      <div className="content-post flex flex-col py-10 px-9 w-[70%] gap-4">
        <PostDetail onDelete={handleDeletePost} onLike={handleOnLikePost} post={post} />
        <CommentCreating onCommentCreated={handleOnComment}/>
        {comments.map((comment, index) => (
          <CommentComp userId={user._id} onDelete={handleDeleteComment} onLike={handleOnLikeComment} key={post._id} comment={comment} />
        ))}
      </div>
      <div className="py-10 px-5 pl-1 gap-7 w-[30%]">
        <MustRead />
      </div>
    </div>
  );
}
