export type Creator = {
  _id: string;
  username: string;
  avatar: string;
};
export type Comment = {
  _id: string;
  content: string;
  creator: Creator;
  total_like: number;
  created_at: string;
  updated_at: string;
};

type Post = {
  postID: string;
  creator: Creator;
  content: string;
  image_content: string;
  totalLike: number;
  totalComment: number;
  comments: Comment[];
  created_at: string;
  updated_at: string;
};

export default Post;
