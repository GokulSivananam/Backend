const app = require("./index.js");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "./config.env" });

const PORT_NO = process.env.PORT_NO;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.listen(PORT_NO, () => {
  console.log("Server is running on port", PORT_NO);
});