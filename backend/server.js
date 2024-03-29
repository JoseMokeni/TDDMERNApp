const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const NODE_ENV = process.env.NODE_ENV;

const app = express();

app.use(express.json());

const taskRoutes = require("./routes/taskRoutes");

app.use(taskRoutes);

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connection established successfully");
});

if (NODE_ENV === "development" || NODE_ENV === "production") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
