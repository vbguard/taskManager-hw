const jwt = require("jsonwebtoken");
const Users = require("../models/users.model");
const getTokenFromAuthHeader = require("../helpers/getTokenFromHeader");
require("dotenv").config();

async function authCheck(req, res, next) {
  try {
    const headers = req.headers;
    const jwtOptions = {
      jwtSecretKey: process.env.JWT_SECRET_KEY || "if not work env"
    };

    const token = getTokenFromAuthHeader(headers);

    if (token) {
      // console.log("jwtSecret :", jwtOptions.jwtSecretKey)
      const validToken = await jwt.verify(token, jwtOptions.jwtSecretKey);

      // console.log("validToken :", validToken)
      if (validToken) {
        const user = await Users.findById(validToken.id);

        if (!user) {
          req.user = null;
          return next();
        }

        // console.log("user :", user)
        if (user) {
          req.user = user;
          return next();
        }
      }
    } else {
      res.status(401).json({
        message: "Unauthorized"
      });
    }
  } catch (error) {
    if (error.message === "invalid signature") {
      // Or we can send some text (not json)
      // res.status(401).send("Unauthorized")

      res.status(401).json({
        message: "Unauthorized"
      });
    }
  }
}

module.exports = authCheck;
