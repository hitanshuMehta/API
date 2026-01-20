const User = require("../models/user.model.js");

exports.registerForm = async (req, res) => {
  await User.findByIdAndUpdate(req.user.id, req.body);
  res.json({ message: "Registration updated" });
};

exports.editRegistration = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(user);
};

exports.getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};
