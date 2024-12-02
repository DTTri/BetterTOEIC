import { User } from "@/entities";
import { signify } from "react-signify";

const sUser = signify({
  info: {} as User,
  users: [] as User[],
  usersPerBand: [] as number[],
});
export default sUser;
