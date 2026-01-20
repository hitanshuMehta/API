const User = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = await User.create({ ...req.body, password: hashedPassword });
  res.status(201).json({ message: "Signup successful" });
};

exports.login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(req.body.password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token });
};
