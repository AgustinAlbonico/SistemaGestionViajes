import { AdminModel } from "../models/admin.model";
import { UserModel } from "../models/user.model";
import jwt from "jsonwebtoken";

const SECRET_KEY: string = process.env.SECRET_KEY || "default";

export const createAuthToken = (user: UserModel) => {
  return jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: "7d" });
};

export const createAuthAdminToken = (user: AdminModel) => {
  return jwt.sign({ admin_username: user.admin_username }, SECRET_KEY, { expiresIn: "7d" });
};
