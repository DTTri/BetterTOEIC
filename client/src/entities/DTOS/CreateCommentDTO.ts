// Definition: DTO for creating a comment
type CreateCommentDTO = {
  content: string;
  creator: {
    _id: string;
    username: string;
    avatar: string;
  };
};

export default CreateCommentDTO;
