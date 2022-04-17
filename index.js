// import modules && variables
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const expressValidator = require("express-validator");
const { globalErrorHandler } = require("./middlewares/globalErrorHandler");
const app = express();
const PORT = process.env.PORT || 8080;
const connectMongoDB = require("./config/mongo/mongoConnect");

// db

connectMongoDB();

// middlewares
// app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(expressValidator());

// routes

app.get("/testing", (req, res) => {
  res.json({ message: "Api up and running !!!" });
});

app.use("/users", require("./routes/user"));

// error handling middleware
app.use(globalErrorHandler);

// port
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
