import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { getUser } from "../services/AuthAdminServices";
import { createAuthAdminToken } from "../utils/createAuthToken";
import { checkAuthToken } from "../utils/checkAuthToken";
import { PayloadInterface } from "../middlewares/checkAuthAdmin.middleware";
import { CustomAdminRequest } from "../models/customRequest.model";

export const loginAdmin = async (req: Request, res: Response) => {
  const resultValidation = validationResult(req);
  const hasErrors = !resultValidation.isEmpty();
  console.log(req.body)

  if (hasErrors) {
    return res.status(400).json({ message: resultValidation.array()[0].msg });
  }

  const inputUser = {
    username: req.body.username,
    password: req.body.password,
  };

  try {
    const userDb = await getUser(inputUser.username);

    if (!userDb?.admin_username)
      return res.status(404).json({ message: "No existe ese usuario" });

    if (inputUser.password === userDb.password) {
      const token: string = createAuthAdminToken(userDb);

      return res.status(200).json({ userDb, token, isAuth: true });
    } else {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

export const checkAuthController = (req: CustomAdminRequest, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1] as string;
  if (token) {
    const decodedToken = checkAuthToken(token) as PayloadInterface;
    req.admin_username = decodedToken.admin_username;
    return res.status(200).json({ expired: false });
  } else {
    return res
      .status(401)
      .json({ message: "Usted no esta autorizado", expired: true });
  }
};
