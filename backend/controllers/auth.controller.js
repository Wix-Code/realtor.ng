import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import validator from "validator"

export const register = async (req, res) => {

  const { username, email, userimg, password } = req.body;


  const use = await User.findOne({ username: req.body.username });
  if (use) {
    return res.status(401).send({ success: false, message: "This username has been taken" })
  }

  if (password.length < 6) {
    return res.status(400).send({ success: false, message: "password must be at least 6 characters" })
  }

  if (!validator.isEmail(email)) {
    return res.status(400).send({ success: false, message: "invalid email" })
  }
  // HASH PASSWORD
  const hash = bcrypt.hashSync(req.body.password, 10);

  const user = new User({ username, userimg, email, password: hash });
  try {
    await user.save();
    res.status(200).send({ success: true, message: "user registered successfully" })
  } catch (error) {
    res.status(401).send({ success: false, message: "user not registered", error: error.message })
  }
}

export const login = async (req, res) => {
  //const { email,password } = req.body;

  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).send({ success: false, message: "Invalid email or password" })
    }

    //COMPARE HASH PASSWORD
    const validPassword = bcrypt.compareSync(req.body.password, user.password);

    if (!validPassword) {
      return res.status(400).send({ success: false, message: "Invalid details" })
    }
    const { password, ...info } = user._doc
    const token = jwt.sign({ id: user._id }, process.env.JWT);
    res.cookie("accessToken", token, { httpOnly: true, sameSite: 'None', secure: process.env.NODE_ENV === "production" || false }).status(200).send({ success: true, message: "user login successfully", info })
  } catch (error) {
    res.status(400).send({ success: false, message: "Error in logging in", error: error.message });
    console.log(error)
  }
}

export const logout = async (req, res) => {
  try {
    res.clearCookie('accessToken');
    res.status(200).json({ success: true, message: "User logout successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "User not Logout", error: error.message });
  }
}