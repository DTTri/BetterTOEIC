import CreatePostDTO from "@/entities/DTOS/CreatePostDTO";
import http from "./http";
import { Post } from "@/entities";
import CreateCommentDTO from "@/entities/DTOS/CreateCommentDTO";
class ForumService {
  baseURI = "forum";
  private getURI(uri: string) {
    return `${this.baseURI}/${uri}`;
  }
  async createPost(data: CreatePostDTO) {
    return await http.post(this.getURI("createPost"), data);
  }
  async getAllPosts() {
    return await http.get(this.getURI("getAllPosts"));
  }
  async getPostById(id: string) {
    return await http.get(this.getURI(`getPostById/${id}`));
  }
  async updatePost(id: string, data: Post) {
    return await http.put(this.getURI(`updatePost/${id}`), data);
  }
  async deletePost(id: string) {
    return await http.delete(this.getURI(`deletePost/${id}`));
  }
  async likePost(id: string, likeDTO: { isLike: boolean; userId: string }) {
    return await http.put(this.getURI(`likePost/${id}`), { ...likeDTO });
  }
  async createComment(postId: string, data: CreateCommentDTO) {
    return await http.post(this.getURI(`createComment/${postId}`), data);
  }
  async updateComment(postId: string, commentId: string, data: Comment) {
    return await http.put(
      this.getURI(`updateComment/${postId}/${commentId}`),
      data
    );
  }
  async deleteComment(postId: string, commentId: string) {
    return await http.delete(
      this.getURI(`deleteComment/${postId}/${commentId}`)
    );
  }
  async likeComment(
    postId: string,
    commentId: string,
    likeDTO: { isLike: boolean; userId: string }
  ) {
    return await http.put(this.getURI(`likeComment/${postId}/${commentId}`), {
      ...likeDTO,
    });
  }
}
export default new ForumService();
