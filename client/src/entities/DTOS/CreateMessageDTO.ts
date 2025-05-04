import { Role } from "../Chat";

type CreateMessageDTO = {
  role: Role;
  content: string;
};
export default CreateMessageDTO;
