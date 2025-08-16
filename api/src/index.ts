import express from "express";
import apiRouter from './routers/apiRouter';
const app = express();
const port = 3000;

app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
