import { Post, Comment, Creator } from "@/entities";

const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateRandomString = (length: number): string => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const generateCreator = (): Creator => {
  return {
    _id: generateRandomString(10),
    username: generateRandomString(8),
    avatar: `https://randomuser.me/api/portraits/lego/${getRandomInt(
      1,
      10
    )}.jpg`,
  };
};

const generateComment = (): Comment => {
  return {
    _id: generateRandomString(10),
    content: generateRandomString(50),
    creator: generateCreator(),
    total_like: getRandomInt(0, 100),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
};

const generatePost = (): Post => {
  const commentsCount = getRandomInt(0, 10);
  const comments: Comment[] = [];
  for (let i = 0; i < commentsCount; i++) {
    comments.push(generateComment());
  }

  return {
    postID: generateRandomString(10),
    creator: generateCreator(),
    content: generateRandomString(100),
    image_content: `https://picsum.photos/200/300?random=${getRandomInt(
      1,
      1000
    )}`,
    totalLike: getRandomInt(0, 500),
    totalComment: commentsCount,
    comments: comments,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
};

const posts: Post[] = new Array(20).fill(null).map(() => generatePost());

export default posts;
