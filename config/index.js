// configure environment variable
import dotenv from "dotenv";
dotenv.config();

// configs
const CONFIG = {
  PORT: process.env.PORT || 8080,
  ENV: process.env.ENV,
};

export default CONFIG;
