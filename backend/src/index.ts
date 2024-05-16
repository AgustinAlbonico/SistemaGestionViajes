import express, { Request, Response } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import compression from "compression";
import bodyParser from "body-parser";
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: true });

const app = express();
import { default as routes } from "./routes";
import { errorHandler } from "./middlewares";

dotenv.config();

app.use(jsonParser);
app.use(urlencodedParser);

app.use(cors());
// app.use((req: Request, res: Response, next: NextFunction) => {
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
//   res.header(`Access-Control-Allow-Headers`, `Content-Type`);
//   next()
// })
// app.options('*', cors())

app.use(morgan("dev"));
app.use(compression());

const PORT: number = parseInt((process.env.PORT || "3001") as string, 10);

app.use("/api", routes);

app.all("*", (req: Request, res: Response) => {
  return res.status(404).json({ message: "Endpoint no encontrado, error 404" });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Servidor corriendo en el puerto " + PORT);
});
