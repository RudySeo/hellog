const express = require("express");
const cors = require("cors");

const {
  getmeals,
  createMeal,
  putMeal,
  getCalorie,
  getOneMeals,
  uploadfiles,
} = require("../controller/meals");
const { auth } = require("../middleware/auth");
const router = express.Router();

router.get("/", auth, getmeals);
router.get("/cal", getCalorie);
router.route("/:id").get(getOneMeals);
router.post("/", auth, createMeal);
router.post("/uploadfiles", uploadfiles);
router.put("/:id", auth, putMeal);

module.exports = router;

// {
//     "meal_type": "아침",
//     "calorie": 600,
//     "meal_desc": ["바나나","멜론"],
//     "user_id": "6043c0fb032f6022cda5c18a"
// }

// {
//     "comment": "아침",
//     "user": "6043c0fb032f6022cda5c18a",
//     "ons": "6043c7e3cf76d92719ccb040",
//     "onMoels": "Meals",
// }
