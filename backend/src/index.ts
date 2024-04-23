import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import compression from "compression";

const app = express();
import { default as routes } from "./routes";
import { errorHandler } from "./middlewares";

dotenv.config();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(compression());

const PORT: number = parseInt((process.env.PORT || "3001") as string, 10);

app.use("/api", routes);

app.use(errorHandler)

app.listen(PORT, () => {
  console.log("Servidor corriendo en el puerto " + PORT);
});
