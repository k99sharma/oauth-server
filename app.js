// importing libraries
import express from "express";
import logger from "./config/logger.js";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";

// importing configs
import CONFIG from "./config/index.js";

// importing route
import route from "./routes/test.js";

// app
const app = express();

// configuring middleware
app.use(helmet());
app.use(cors());
app.use(compression());

// route
app.use("/test", route);
app.use("*", (req, res) => {
  // not found route
  return res.send({
    success: true,
    data: {
      msg: "Route not found.",
    },
    error: null,
  });
});

app.use(
  express.json({
    limit: "50mb",
    extended: true,
    parameterLimit: 1000000,
  })
);

// allowing headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");

  next();
});

try {
  // app listener
  app.listen(CONFIG.PORT, () => {
    logger.info(`Server is running at PORT: ${CONFIG.PORT}`);
  });
} catch (err) {
  logger.info("Server unable to start.");
  logger.error(err);
}
