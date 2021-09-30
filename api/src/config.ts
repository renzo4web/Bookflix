import dotenv from "dotenv"
dotenv.config()

export default {
  jwtSecret: process.env.JWT_SECRET || "thisisasecret",
  PORT: process.env.PORT || 5000,
  CNN_STRING: process.env.CNN_STRING || "http://localhost",
};