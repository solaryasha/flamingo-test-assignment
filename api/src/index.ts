import express from "express";
import env from "dotenv";
import apiRouter from './routers/apiRouter';
const port = 3000;

env.config();

const app = express();
app.use(express.json());
app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
