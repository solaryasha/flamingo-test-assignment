import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import type { Request, Response } from "express";
import env from "dotenv";
import apiRouter from './routers/apiRouter';
import { errorHandler } from './middlewares/errorHandler';
const port = 3000;

env.config();

const app = express();
app.use(cookieParser());

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// parse application/json
app.use(express.json());

app.use("/api", apiRouter);

app.get("/health", (_req: Request, res: Response) => {
  const data = {
    uptime: process.uptime(),
    message: "Ok",
    date: new Date()
  };
  res.status(200).send(data);
});

app.use(express.static(path.join(__dirname, '../../dist')));

app.use('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist', 'index.html'));
});
app.use(errorHandler);

const server = app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

process.on("SIGTERM", () => {
  server.close(() => {
    console.log("Process terminated");
  });
});