// importing libraries
import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";
import CONFIG from "../config/index.js";

const client = jwksClient({
  jwksUri: `${CONFIG.ISSUER}.well-known/jwks.json`,
});

// auth middleware
export const authCheck = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).send({ message: "Unauthorized: Missing token" });
  }

  const options = {
    audience: CONFIG.AUD,
    issuer: CONFIG.ISSUER,
  };

  const getKey = (header, callback) => {
    client.getSigningKey(header.kid, (err, key) => {
      const signingKey = key.publicKey || key.rsaPublicKey;
      callback(null, signingKey);
    });
  };

  jwt.verify(token, getKey, options, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized: Invalid token" });
    }
    req.user = decoded;
    next();
  });
};
