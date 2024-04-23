import { check } from "express-validator";

export const loginSchema = [
  check("username")
    .exists()
    .withMessage("Usuario requerido")
    .notEmpty()
    .withMessage("Usuario vacio")
    .isString()
    .withMessage("Usuario invalido"),

  check("password")
    .exists()
    .withMessage("Contraseña requerida")
    .notEmpty()
    .withMessage("Contraseña vacia")
    .isAlphanumeric()
    .withMessage("Contraseña invalida"),
];
