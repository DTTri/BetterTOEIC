import { ObjectId } from 'mongodb';
import User from './User';
import Comment from './Comment';

type Post = {
    _id: ObjectId;
    creator: User;
    content: string;
    contentImage?: string[];
    totalLike: number;
     comments: Comment[];
    created_at: string;
    updated_at: string;
}

export default Post;