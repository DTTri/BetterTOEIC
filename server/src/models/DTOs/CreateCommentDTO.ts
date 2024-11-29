import User from "../User";

type CreateCommentDTO = {
    user: User
    content: string;
}

export default CreateCommentDTO;