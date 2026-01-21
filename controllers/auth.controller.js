const User = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    console.log("📥 Signup request received:", req.body);

    // Validate input
    if (!req.body.email || !req.body.password) {
      console.warn("⚠️ Missing email or password");
      return res.status(400).json({ message: "Email and password are required" });
    }

    console.log("🔐 Hashing password...");
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    console.log("📝 Creating user in database...");
    await User.create({
      ...req.body,
      password: hashedPassword
    });

    console.log("✅ User signup successful:", req.body.email);
    res.status(201).json({ message: "Signup successful" });

  } catch (error) {
    console.error("❌ Signup controller failed:", error.message);

    // Duplicate email error
    if (error.code === 11000) {
      console.warn("⚠️ Duplicate email attempt:", req.body.email);
      return res.status(409).json({ message: "Email already exists" });
    }

    res.status(500).json({ message: "Server Error" });
  }
};



// exports.signup = async (req, res) => {
//   try {
//     const hashedPassword = await bcrypt.hash(req.body.password, 10);

//     const user = await User.create({ ...req.body, password: hashedPassword });

//     res.status(201).json({ message: "Signup successful" });
//   } catch (error) {
//     console.error("signup controller failed:",error.message);
//     res.status(500).json({ message: "Server Error" });
//   }
// };


exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } 
    );

    res.json({ token });
  } catch (error) {
    console.error("Login controller failed:",error.message);
    res.status(500).json({ message: "Server Error" });
  }
};
