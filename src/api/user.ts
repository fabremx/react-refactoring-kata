import { User } from "../models";

export const getUser = async (): Promise<User> => {
  const response = await fetch("http://localhost:3000/api/user.json");
  return await response.json();
};
