
type Comment = {
    _id: string;
    content: string;
    creator: {
        _id: string;
        username: string;
        avatar: string;
    };
    totalLike: number;
    created_at: string;
    updated_at: string;
}
export default Comment;