import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next) => {
  // Implement token verification logic here

  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).json({ success: false, message: "Not authorised" })
  }
  // Verify token with JWT and continue with next middleware or route

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return res.status(403).json({ success: false, message: "Invalid token" })
    req.user = user;
    next();
  })
}