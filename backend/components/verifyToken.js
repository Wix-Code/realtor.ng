import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next) => {
  // Implement token verification logic here

  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).json({ success: false, message: "Not authorised" })
  }
  // Verify token with JWT and continue with next middleware or route

  try {

    const decode = jwt.verify(token, process.env.JWT)
    req.user = decode.id;
    next();
    console.log(req.user, "req user")
    console.log(decode, "decode user")

  } catch (error) {
    res.status(500).send({ success: false, message: "Invalid token or details" })
  }
}