import User from "../User";

type CreateCommentDTO = {
    creator: {
        _id: string;
        username: string;
        avatar: string;
    };
    content: string;
}

export default CreateCommentDTO;