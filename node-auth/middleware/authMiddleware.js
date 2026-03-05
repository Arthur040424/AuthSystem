const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  // 1. Get the token from the authorization header
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access denied. No token provided." })
  }

  // 2. Extract the token (remove "Bearer " prefix)
  const token = authHeader.split(" ")[1];

  try {
    // 3. Verify the token using our secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4, Attach the decoded payload to the request object
    req.user = decoded;

    // 5. Pass control to the next handler
    next();

  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token." });
  }
}

module.exports = authMiddleware;