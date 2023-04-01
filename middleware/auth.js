// importing libraries
import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";
import CONFIG from "../config/index.js";

// client to get signing key from auth0 application
const client = jwksClient({
  jwksUri: `${CONFIG.ISSUER}.well-known/jwks.json`,
});

// auth middleware
export const authCheck = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  // if token is not provided
  if (!token) {
    return res.status(401).send({ message: "Unauthorized: Missing token" });
  }

  // options
  const options = {
    audience: CONFIG.AUD,
    issuer: CONFIG.ISSUER,
  };

  // getting key to verify token
  const getKey = (header, callback) => {
    client.getSigningKey(header.kid, (err, key) => {
      const signingKey = key.publicKey || key.rsaPublicKey;
      callback(null, signingKey);
    });
  };

  // verifying token
  jwt.verify(token, getKey, options, (err, decoded) => {
    // in case of invalid token request is terminated
    if (err) {
      return res.status(401).send({ message: "Unauthorized: Invalid token" });
    }

    req.user = decoded; // decoded data is added with user object
    next();
  });
};
