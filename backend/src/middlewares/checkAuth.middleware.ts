import { NextFunction, Request, Response } from "express";
import { checkAuthToken } from "../utils/checkAuthToken";

interface PayloadInterface {
  username: string;
  iat: number;
  exp: number;
}

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1] as string;
  if (token) {
    const decodedToken = checkAuthToken(token) as PayloadInterface;
    req.username = decodedToken.username;
    next();
  } else {
    return res.status(401).json({ message: "Usted no esta autorizado" });
  }
};
