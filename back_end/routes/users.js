const express = require("express");

const {
  getusers,
  createUser,
  getUser,
  login,
  logout,
  myinfo,
  // friend,
} = require("../controller/users");
const { auth } = require("../middleware/auth");

const router = express.Router();

router.get("/", getusers);
router.get("/auth", auth, myinfo);
router.post("/", createUser);
router.post("/login", login);
router.get("/logout", auth, logout);

router.get("/:id", getUser);
module.exports = router;

// {
//   user_id:"min123"
//   email:"12345@gmail.com"
// }
