import express, { request, response } from "express";

const app = express();

app.get("/", (request, response) => {
  return response.json({ msg: "Hello World" });
});

app.listen(3333, () => {
  console.log("Decolou 🚀");
});
