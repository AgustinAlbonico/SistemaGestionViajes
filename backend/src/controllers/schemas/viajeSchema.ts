import { check } from "express-validator";

const patenteVieja = /(^[A-Z]{3}\d{3}$)/;
const patenteNueva = /(^[A-Z]{2}\d{3}[A-Z]{2}$)/;

const patentesCombinadas = new RegExp(
  `${patenteVieja.source}|${patenteNueva.source}`
);

export const viajeSchema = [
  check("fecha_viaje")
    .exists()
    .withMessage("Viaje sin fecha cargada")
    .notEmpty()
    .withMessage("Viaje sin fecha cargada")
    .matches(/^([0-2][0-9]|3[0-1])(\/|-)(0[1-9]|1[0-2])\2(\d{4})$/)
    .withMessage("La fecha debe tener el formato DD/MM/YYYY"),
  check("movimiento")
    .exists()
    .withMessage("Viaje sin movimiento cargado")
    .notEmpty()
    .withMessage("Viaje sin movimiento cargado")
    .isString(),
  check("patente")
    .exists()
    .withMessage("Viaje sin patente cargado")
    .notEmpty()
    .withMessage("Viaje sin patente cargado")
    .isString()
    .matches(patentesCombinadas)
    .withMessage("El formato de la patente es erroneo"),
  check("marca")
    .exists()
    .withMessage("Viaje sin marca cargada")
    .notEmpty()
    .withMessage("Viaje sin marca cargada")
    .isString()
    .withMessage("La marca ingresada no es correcta"),
  check("modelo")
    .exists()
    .withMessage("Viaje sin modelo cargado")
    .notEmpty()
    .withMessage("Viaje sin modelo cargado")
    .isString()
    .withMessage("El modelo ingresado no es correcto"),
  check("cantKms")
    .exists()
    .withMessage("Viaje sin cant. de kms cargado")
    .notEmpty()
    .withMessage("Viaje sin cant. de kms cargado")
    .isNumeric()
    .withMessage("Cant. de kms con formato incorrecto"),
  check("metodosPago")
    .exists()
    .withMessage("Viaje sin metodo de pago cargado")
    .notEmpty()
    .withMessage("Viaje sin metodo de pago cargado")
    .isArray(),
  check("particular").exists().isBoolean(),
  check("origen")
    .exists()
    .withMessage("Viaje sin origen cargado")
    .notEmpty()
    .withMessage("Viaje sin origen cargado")
    .isString()
    .withMessage("El origen ingresado no es correcto"),
  check("destino")
    .exists()
    .withMessage("Viaje sin destino cargado")
    .notEmpty()
    .withMessage("Viaje sin destino cargado")
    .isString()
    .withMessage("El destino ingresado no es correcto"),
  check("observaciones")
    .isString()
];
