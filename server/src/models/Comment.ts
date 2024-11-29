import { ObjectId } from 'mongodb';

type Comment = {
    _id: ObjectId;
    content: string;
    totalLike: number;
    created_at: string;
    updated_at: string;
}

export default Comment;