require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db.js");
const logger = require("./config/logger.js");

const app = express();

app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

app.use("/api/auth", require("./routes/auth.routes.js"));
app.use("/api/users", require("./routes/user.routes.js"));

app.use(require("./middleware/error.middleware.js"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
