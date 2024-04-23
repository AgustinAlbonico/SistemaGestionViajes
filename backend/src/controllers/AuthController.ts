import moment from "moment";
import { JwtPayload } from "jsonwebtoken";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { getUser } from "../services/AuthServices";
import { createAuthToken } from "../utils/createAuthToken";
import { checkAuthToken } from "../utils/checkAuthToken";

export const login = async (req: Request, res: Response) => {
  const resultValidation = validationResult(req);
  const hasErrors = !resultValidation.isEmpty();

  if (hasErrors) {
    return res.status(400).json({ message: resultValidation.array()[0].msg });
  }

  const inputUser = {
    username: req.body.username,
    password: req.body.password,
  };

  try {
    const userDb = await getUser(inputUser.username);

    if (!userDb?.username)
      return res.status(404).json({ message: "No existe ese usuario" });

    if (inputUser.password === userDb.password) {
      const token: string = createAuthToken(userDb);

      return res.status(200).json({ userDb, token });
    } else {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

export const loggedUser = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] as string;

    if (!token)
      return res
        .status(401)
        .json({ authenticated: false, message: "Usted no esta autenticado!" });

    try {
      const userPayload = checkAuthToken(token) as JwtPayload;
      const dateToday = moment();

      const dateExp = moment(userPayload.exp! * 1000);

      if (dateToday >= dateExp) {
        return res.status(400).json({
          authenticated: false,
          message: "Su sesión ha caducado, por favor vuelva a iniciar sesión",
        });
      }

      const user = await getUser(userPayload.username);

      return res.status(200).json({ authenticated: true, user });
    } catch (error) {
      return res.status(500).json({ message: "Error en el servidor" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};
