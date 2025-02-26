const { verifyToken: validateToken } = require("../utils/tokenUtils");
const cookieParser = require("cookie-parser");

const verifyToken = (req, res, next) => {
  // Extract token from cookies
  const token = req.cookies?._auth;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access Denied. No token provided." });
  }

  // Verify token
  const decoded = validateToken(token);
  if (!decoded) {
    return res.status(403).json({ message: "Invalid token." });
  }

  // Attach user data to request object
  req.user = decoded;
  next();
};

module.exports = verifyToken;
