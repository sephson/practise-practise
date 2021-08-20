const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const express = require("express");
const connectDB = require("./config/db.js");
const route = require("./routes/route");
const app = express();
connectDB();

app.use(express.json());

app.use("/test", route);

const server = app.listen(process.env.PORT, () =>
  console.log(`server running at ${process.env.PORT}`)
);

process.on("unhandledRejection", (err) => {
  console.log(`Logged Error: ${err}`);
  server.close(() => process.exit(1));
});
