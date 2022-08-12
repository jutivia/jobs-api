require("dotenv").config();
require("express-async-errors");

//security 
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require("express-rate-limit");

const express = require("express");
const app = express();
const authenticationMiddleware = require("./middleware/authentication");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const jobRouter = require("./routes/jobs")
const authRouter = require("./routes/auth");
const connectDB = require("./db/connect");
app.use(express.json());
// extra packages
app.set('trust proxy', 1)
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);
app.use(helmet())
app.use(cors())
app.use(xss())


app.get('/', (req, res) => {
  res.send('Jobs api')
})
// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', [authenticationMiddleware, jobRouter]);


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
