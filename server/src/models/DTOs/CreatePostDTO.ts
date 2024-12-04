
type CreatePostDTO = {
    creator: {
        _id: string;
        username: string;
        avatar: string;
    };
    content: string;
    contentImage?: string[];
}

export default CreatePostDTO;