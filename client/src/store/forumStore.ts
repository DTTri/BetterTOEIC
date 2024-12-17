import { Post } from "@/entities";
import { signify } from "react-signify";

const sForum = signify({
    posts: [] as Post[],
});

export default sForum;