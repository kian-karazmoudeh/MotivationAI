require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 5000,
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_USER: process.env.DB_USER || "root",
  DB_PASS: process.env.DB_PASS || "",
  DB_NAME: process.env.DB_NAME || "test",
  JWT_SECRET: process.env.JWT_SECRET || "your_jwt_secret_key",
  GPT_API_KEY: process.env.GPT_API_KEY,
  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:3000",
  NODE_ENV: process.env.NODE_ENV || "development",
};
