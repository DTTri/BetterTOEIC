import { ObjectId } from 'mongodb';

type Comment = {
    _id: ObjectId;
    content: string;
    creator: {
        _id: string;
        username: string;
        avatar: string;
    };
    totalLike: string[];
    created_at: string;
    updated_at: string;
}

export default Comment;