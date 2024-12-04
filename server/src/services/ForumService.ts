import exp from 'constants';
import { ObjectId } from 'mongodb';
import { collections } from '~/config/connectDB';
import { Post, Comment } from '~/models';
import { CreateCommentDTO } from '~/models/DTOs';

class ForumService {
  async createPost(createdPost: Post): Promise<boolean> {
    const result = await collections.posts?.insertOne(createdPost);
    return result ? true : false;
  }
  async updatePost(postId: string, updatePost: Post): Promise<boolean> {
    const result = await collections.posts?.updateOne({ _id: new ObjectId(postId) }, { $set: updatePost });
    return result ? true : false;
  }
  async deletePost(postId: string): Promise<boolean> {
    const result = await collections.posts?.deleteOne({ _id: new ObjectId(postId) });
    return result ? true : false;
  }
  async getAllPosts(): Promise<Post[] | null> {
    const result = await collections.posts?.find().toArray();
    if (result) {
      return result as Post[];
    }
    return null;
  }
  async getPostById(postId: string): Promise<Post | null> {
    const result = await collections.posts?.findOne({ _id: new ObjectId(postId) });
    if(result){
        return result as Post;
    }
    return null;
  }
  async likePost(postId: string, isLike: boolean): Promise<boolean> {
    const result = await collections.posts?.findOne( { _id: new ObjectId(postId) });
    const foundPost = result as Post;
    if(result){
      if(isLike){
        foundPost.totalLike += 1;
      } else {
        foundPost.totalLike -= 1;
      }
      const likeResult = await collections.posts?.updateOne(
        { _id: new ObjectId(postId) },
        { $set: { totalLike: foundPost.totalLike, updated_at: new Date().toISOString() } }
      );
      return result ? true : false;
    }
    return false;
  }
  async createComment(postId: string, newComment: Comment): Promise<boolean> {
    const result = await collections.posts?.findOne(
      { _id: new ObjectId(postId) },
    ) ;
    const foundPost = result as Post;
    if (foundPost){
        foundPost.comments.push(newComment);
        const result = await collections.posts?.updateOne(
          { _id: new ObjectId(postId) },
          { $set: { comments: foundPost.comments, updated_at: new Date().toISOString() } }
        );
        return result ? true : false;
    }
    return false;
  }
  async likeComment(postId: string, commentId: string, isLike: boolean): Promise<boolean> {
    const result = await collections.posts?.findOne(
      { _id: new ObjectId(postId) },
    ) ;
    const foundPost = result as Post;
    if (foundPost){
        const commentIndex = foundPost.comments.findIndex((comment) => comment._id.toString() === commentId);
        if (commentIndex !== -1) {
          if(isLike){
            foundPost.comments[commentIndex].totalLike += 1;
          } else {
            foundPost.comments[commentIndex].totalLike -= 1;
          }
        }
        const result = await collections.posts?.updateOne(
          { _id: new ObjectId(postId) },
          { $set: { comments: foundPost.comments, updated_at: new Date().toISOString() } }
        );
        return result ? true : false;
    }
    return false;
  }
  async updateComment(postId: string, commentId: string, updateComment: Comment): Promise<boolean> {
    const result = await collections.posts?.findOne( {_id: new ObjectId(postId) });
    const foundPost = result as Post;
    if(foundPost){
      const commentIndex = foundPost.comments.findIndex((comment) => comment._id.toString() === commentId);
      if (commentIndex !== -1) {
        foundPost.comments[commentIndex] = updateComment;
        const result = await collections.posts?.updateOne(
          { _id: new ObjectId(postId) },
          { $set: { comments: foundPost.comments, updated_at: new Date().toISOString() } }
        );
        return result ? true : false;
      }
    }
    return false;
  }

  async deleteComment(postId: string, commentId: string): Promise<boolean> {
    const result = await collections.posts?.findOne( {_id: new ObjectId(postId) });
    const foundPost = result as Post;
    if(foundPost){
      const updatedComments = foundPost.comments.filter((comment) => comment._id.toString() != commentId);
      const result = await collections.posts?.updateOne(
        { _id: new ObjectId(postId) },
        { $set: { comments: updatedComments, updated_at: new Date().toISOString() } }
      );
      return result ? true : false;
    }
    return false;
  }
}

export const forumServiceInstance = new ForumService();