import { User } from "../entities";

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

const generateRandomEmail = (): string => {
  const domains = ["example.com", "test.com", "demo.com"];
  return `${generateRandomString(8)}@${
    domains[getRandomInt(0, domains.length - 1)]
  }`;
};

const generateUser = (): User => {
  return {
    _id: generateRandomString(10),
    email: generateRandomEmail(),
    username: generateRandomString(8),
    password: generateRandomString(12),
    fullname: `${generateRandomString(5)} ${generateRandomString(7)}`,
    avatar: `https://randomuser.me/api/portraits/lego/${getRandomInt(
      1,
      10
    )}.jpg`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    isAdmin: Math.random() < 0.5,
  };
};

const users: User[] = new Array(20).fill(null).map(() => generateUser());

export default users;
