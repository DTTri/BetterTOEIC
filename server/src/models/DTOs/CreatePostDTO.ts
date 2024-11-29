import User from "../User";

type CreatePostDTO = {
    creator: User;
    content: string;
    contentImage?: string[];
}

export default CreatePostDTO;