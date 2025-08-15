import express from "express";
const app = express();
const port = 3000;

app.get("/api/time", (req, res) => {
  res.send({ time: new Date().toLocaleTimeString() });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});