require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const connectDb = require('./db/connect')

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const jobRouter = require("./routes/jobs")
const authRouter = require("./routes/auth");
const connectDB = require("./db/connect");
app.use(express.json());
// extra packages

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', jobRouter);


app.use([notFoundMiddleware, errorHandlerMiddleware]);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
