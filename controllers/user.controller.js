const User = require("../models/user.model.js");

exports.registerForm = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user.id, req.body);

    res.json({ message: "Registration updated" });
  } catch (error) {
    console.error("registration form error",error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.editRegistration = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("update Registration form error",error.message);
    res.status(500).json({ message: "Server Error" });
  }
};


exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    console.error("Get all user:",error.message);
    res.status(500).json({ message: "Server Error" });
  }
};
