const router = require("express").Router();
const auth = require("../middleware/auth.middleware.js");
const {
  registerForm,
  editRegistration,
  getAllUsers
} = require("../controllers/user.controller.js");

router.put("/register", auth, registerForm);
router.put("/:id", auth, editRegistration);
router.get("/", auth, getAllUsers);

module.exports = router;
