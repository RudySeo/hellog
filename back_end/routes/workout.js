const express = require("express");

const {
  getWorkOut,
  createWorkout,
  putWorkout,
  getOneWorkOut,
} = require("../controller/workout");
const { auth } = require("../middleware/auth");
const router = express.Router();

router.get("/", auth, getWorkOut);
router.route("/:id").get(getOneWorkOut);
router.post("/", auth, createWorkout);
router.put("/:id", putWorkout);

module.exports = router;
