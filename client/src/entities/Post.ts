import Comment from "./Comment";

type Post = {
  _id: string;
  creator: {
    _id: string;
    username: string;
    avatar: string;
  };
  content: string;
  contentImage: string[];
  totalLike: number;
  comments: Comment[];
  created_at: string;
  updated_at: string;
};

export default Post;
