import { Request } from "express";

export interface CustomUserRequest extends Request {
  username: string;
}

export interface CustomAdminRequest extends Request {
  admin_username: string;
}
