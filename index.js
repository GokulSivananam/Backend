const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors({
  origin: ["http://localhost:3000", "https://frontend-nine-hazel-n0odiiy2v3.vercel.app"],
  credentials: true
}));
app.use(express.json());
const Router = require("./Router/Router.js");

app.use("/api",Router)

module.exports=app;