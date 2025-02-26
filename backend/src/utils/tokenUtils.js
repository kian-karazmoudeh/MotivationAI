const jwt = require("jsonwebtoken");
const { JWT_SECRET, NODE_ENV } = require("../config/env");

/**
 * Generate a JWT token for a user
 * @param {Object} user - User object containing id and email
 * @param {string} expiresIn - Token expiration time (default: '1h')
 * @returns {string} JWT token
 */
const generateToken = (user, expiresIn = "1h") => {
  return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn,
  });
};

/**
 * Verify a JWT token
 * @param {string} token - JWT token to verify
 * @returns {Object|null} Decoded token payload or null if invalid
 */
const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

/**
 * Set JWT token as a cookie
 * @param {Object} res - Express response object
 * @param {string} token - JWT token
 * @param {number} maxAge - Cookie max age in milliseconds (default: 1 hour)
 */
const setTokenCookie = (res, token, maxAge = 3600000) => {
  res.cookie("_auth", token, {
    httpOnly: true,
    secure: NODE_ENV === "production",
    sameSite: "strict",
    maxAge,
  });
};

/**
 * Clear the auth cookie
 * @param {Object} res - Express response object
 */
const clearTokenCookie = (res) => {
  res.clearCookie("_auth");
};

module.exports = {
  generateToken,
  verifyToken,
  setTokenCookie,
  clearTokenCookie,
};
