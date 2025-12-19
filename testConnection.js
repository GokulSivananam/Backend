const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
    console.log("Database:", mongoose.connection.db.databaseName);
    return mongoose.connection.db.admin().listCollections().toArray();
  })
  .then(collections => {
    console.log("Collections:", collections.map(c => c.name));
    process.exit(0);
  })
  .catch(err => {
    console.log("Connection error:", err.message);
    process.exit(1);
  });