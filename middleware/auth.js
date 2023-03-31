// importing libraries
import logger from "../config/logger.js";

// auth middleware
export const allAuth = (req, res, next) => {
  // right now just logging
  logger.info("All authenticated request can go through.");

  next();
};
