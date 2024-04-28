import { NextFunction, Response } from "express";
import { checkAuthToken } from "../utils/checkAuthToken";
import { CustomUserRequest } from "../models/customRequest.model";
import moment from "moment";

interface PayloadInterface {
  username: string;
  iat: number;
  exp: number;
}

export const checkAuth = (req: CustomUserRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1] as string;
  if (token) {
    const decodedToken = checkAuthToken(token) as PayloadInterface;
    const now = moment().unix();
    if (decodedToken.exp > now) {
      req.username = decodedToken.username;
      next();
    } else {
      return res
      .status(401)
      .json({ message: "Su sesión expiro", expired: true });
    }
  } else {
    return res.status(401).json({ message: "Usted no esta autorizado", expired: true });
  }
};
