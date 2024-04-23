import jwt from "jsonwebtoken";

export const checkAuthToken = (token: string) => {
  return jwt.decode(token);
};
