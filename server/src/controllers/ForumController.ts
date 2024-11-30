import { ObjectId } from "mongodb";
import { Comment, Post } from "~/models";
import { CreatePostDTO } from "~/models/DTOs";
import { Request, Response } from 'express';
import { forumMiddlewareInstance } from "~/middlewares/ForumMiddleware";
import { forumServiceInstance } from "~/services/ForumService";

class ForumController {
    async createPost(req: Request, res: Response) {
        try {
            const createdPostDTO: CreatePostDTO = req.body;
            const newPost: Post = {
                ...createdPostDTO,
                comments: [],
                totalLike: 0,
                _id: new ObjectId(),
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };
            const result = await forumServiceInstance.createPost(newPost);
            if(result){
                res.status(201).json({
                    EM: 'Post created successfully',
                    EC: 0,
                    DT: newPost
                });
            }
            else {
                res.status(400).json({
                    EM: 'Failed to create post',
                    EC: 3
                });
            }
        } catch (error: any) {
            res.status(500).json({
                EM: error.message,
                EC: 4
            });
        }
    }
    async getAllPosts(req: Request, res: Response) {
        try {
            const result = await forumServiceInstance.getAllPosts();
            if(result){
                res.status(200).json({
                    EM: 'Posts fetched successfully',
                    EC: 0,
                    DT: result
                });
            }
            else{
                res.status(400).json({
                    EM: 'Failed to fetch posts',
                    EC: 1
                });
            }
        } catch (error: any) {
            res.status(500).json({
                EM: error.message,
                EC: 4
            })
        }
    }
    async getPostById(req: Request, res: Response) {
        try {
            const { postId } = req.params;
            if(!postId){
                res.status(400).json({
                    EM: 'Post ID is required',
                    EC: 1
                });
                return;
            }
            const result = await forumServiceInstance.getPostById(postId);
            if(result){
                res.status(200).json({
                    EM: 'Post fetched successfully',
                    EC: 0,
                    DT: result
                });
            }
            else{
                res.status(400).json({
                    EM: 'Post not found',
                    EC: 2
                });
            }
        } catch (error: any) {
            res.status(500).json({
                EM: error.message,
                EC: 4
            })
        }
    }
    async updatePost(req: Request, res: Response) {
        try {
            const postId = req.params.postId;
            if(req.body.content === ''){
                res.status(400).json({
                    EM: 'Content is required',
                    EC: 2
                });
                return;
            }
            const updatedPost: Post = {
                ...req.body,
                updated_at: new Date().toISOString()
            };
            const result = await forumServiceInstance.updatePost(postId, updatedPost);
            if(result){
                res.status(200).json({
                    EM: 'Post updated successfully',
                    EC: 0,
                    DT: updatedPost
                });
            }
        } catch (error: any) {
            res.status(500).json({
                EM: error.message,
                EC: 4
            })
        }
    }
    async likePost(req: Request, res: Response) {
        try {
            const postId = req.params.postId;
            if(!postId){
                res.status(400).json({
                    EM: 'Post ID is required',
                    EC: 1
                });
                return;
            }
            const result = await forumServiceInstance.likePost(postId);
            if(result){
                res.status(200).json({
                    EM: 'Post liked successfully',
                    EC: 0,
                });
            }
        } catch (error: any) {
            res.status(500).json({
                EM: error.message,
                EC: 4
            });
        }
    }
    async deletePost(req: Request, res: Response) {
        try {
            const postId = req.params.postId;
            if(!postId){
                res.status(400).json({
                    EM: 'Post ID is required',
                    EC: 1
                });
                return;
            }
            const curPost = await forumServiceInstance.getPostById(postId);
            if(!curPost){
                res.status(400).json({
                    EM: 'Post not found',
                    EC: 2
                });
                return;
            }
            const result = await forumServiceInstance.deletePost(postId);
            if(result){
                res.status(200).json({
                    EM: 'Post deleted successfully',
                    EC: 0,
                });
            }
        } catch (error: any) {
            res.status(500).json({
                EM: error.message,
                EC: 4
            });
        }
    }
    async createComment(req: Request, res: Response) {
        try {
            const postId = req.params.postId;
            if(!postId){
                res.status(400).json({
                    EM: 'Post ID is required',
                    EC: 1
                });
                return;
            }
            const curPost = await forumServiceInstance.getPostById(postId);
            if(!curPost){
                res.status(400).json({
                    EM: 'Post not found',
                    EC: 2
                });
                return;
            }
            const newComment: Comment = {
                ...req.body,
                _id: new ObjectId(),
                totalLike: 0,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            }
            const result = await forumServiceInstance.createComment(postId, newComment);
            if(result){
                res.status(201).json({
                    EM: 'Comment created successfully',
                    EC: 0,
                    DT: newComment
                });
            }
        } catch (error: any) {
            res.status(500).json({
                EM: error.message,
                EC: 4
            });
        }
    }
    async updateComment(req: Request, res: Response) {
        try {
            const { postId, commentId } = req.params;
            if(!postId || !commentId){
                res.status(400).json({
                    EM: 'Post ID or Comment Id is required',
                    EC: 1
                });
                return;
            }
            const curPost = await forumServiceInstance.getPostById(postId);
            const curComment = curPost?.comments.find(comment => comment._id.toString() === commentId.toString());
            if(!curComment){
                res.status(400).json({
                    EM: 'Comment not found',
                    EC: 2
                });
                return;
            }
            const updatedComment: Comment = {
                ...req.body,
                updated_at: new Date().toISOString()
            }
            const result = await forumServiceInstance.updateComment(postId, commentId, updatedComment);
            if(result){
                res.status(201).json({
                    EM: 'Comment updated successfully',
                    EC: 0,
                    DT: updatedComment
                });
            }
        } catch (error: any) {
            res.status(500).json({
                EM: error.message,
                EC: 4
            });
        }
    }
    async deleteComment(req: Request, res: Response) {
        try {
            const { postId, commentId } = req.params;
            if(!postId || !commentId){
                res.status(400).json({
                    EM: 'Post ID or Comment Id is required',
                    EC: 1
                });
                return;
            }
            const result = await forumServiceInstance.deleteComment(postId, commentId);
            if(result){
                res.status(201).json({
                    EM: 'Comment deleted successfully',
                    EC: 0,
                });
            }
        } catch (error: any) {
            res.status(500).json({
                EM: error.message,
                EC: 4
            });
        }
    }
    async likeComment(req: Request, res: Response) {
        try {
            const { postId, commentId } = req.params;
            if(!postId || !commentId){
                res.status(400).json({
                    EM: 'Post ID or Comment Id is required',
                    EC: 1
                });
                return;
            }
            const curPost = await forumServiceInstance.getPostById(postId);
            const curComment = curPost?.comments.find(comment => comment._id.toString() === commentId.toString());
            if(!curPost){
                res.status(400).json({
                    EM: 'Post not found',
                    EC: 2
                });
                return;
            }
            if(!curComment){
                res.status(400).json({
                    EM: 'Comment not found',
                    EC: 2
                });
                return;
            }
            const result = await forumServiceInstance.likeComment(postId, commentId);
            if(result){
                res.status(201).json({
                    EM: 'Comment liked successfully',
                    EC: 0,
                });
            }
        } catch (error: any) {
            res.status(500).json({
                EM: error.message,
                EC: 4
            });
            
        }
    }
}

export const forumControllerInstance = new ForumController();