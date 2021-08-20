const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const express = require("express");
const connectDB = require("./config/db.js");
const app = express();
connectDB();

app.use(express.json());

const server = app.listen(process.env.PORT, () =>
  console.log(`server running at ${process.env.PORT}`)
);

process.on("unhandledRejection", (err) => {
  console.log(`Logged Error: ${err}`);
  server.close(() => process.exit(1));
});
