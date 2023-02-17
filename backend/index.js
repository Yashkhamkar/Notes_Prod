// creating backend in mern
const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");
const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 9002;
app.use(cors());
connectDB();
app.use("/api/user", userRoutes);
app.use("/api/notes", noteRoutes);
__dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/frontend/build")));
app.use("*", (req, res) =>
  res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
