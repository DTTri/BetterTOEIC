import { Role } from "../Message";

type CreateMessageDTO = {
    role: Role;
    content: string;
};
export default CreateMessageDTO;