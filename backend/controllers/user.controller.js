import User from "../models/user.model.js";

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return res.status(401).json({ success: false, message: "You can only update your account only." })
  }
  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    const { password, ...info } = updatedUser._doc

    res.status(200).json({ success: true, message: "User updated successfully", info: info })

  } catch (error) {
    res.status(400).json({ success: false, message: "User not updated", error: error.message })
    console.log(error)
  }
}

export const deleteUser = async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      return res.status(401).json({ success: false, message: "You can only delete your account only." })
    }

    const deleteUser = await User.findByIdAndDelete(req.user.id)
    res.clearCookie("accessToken");
    res.status(200).json({ success: true, message: "User deleted successfully", deleteUser });

  } catch (error) {
    res.status(400).json({ success: false, message: "User not deleted", error: error.message })
    console.log(error)
  }
}