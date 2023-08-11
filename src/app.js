//CONFIGURACION DE API DE BACKEND

import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import taskRoutes from "./routes/tasks.routes.js";
import authRoutes from "./routes/auth.routes.js";


const app = express();

//Middlewares
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.get("/", (req, res) => res.json({ message: "buenas buenas API" }));
app.use("/api", taskRoutes);
app.use("/api", authRoutes);

//Error hander
app.use((err, req, res, next) => {
  res.status(500).json({
    status: "error",
    message: err.message,
  });
});
export default app;
