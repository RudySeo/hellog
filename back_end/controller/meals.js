const path = require("path");
const ErrorResponse = require("../utils/erroRespons");
const asyncHandler = require("../middleware/async");
const Meals = require("../models/meals");
const User = require("../models/user");
const multer = require("multer");
const { Comment } = require("../models/comment");
const getCurrentDate = require("../lib/getCurrentDate");
const meals = require("../models/meals");

// 전체 식단 리스트 조회
// GET api/meals/
exports.getmeals = asyncHandler(async (req, res, next) => {
  const meals = await Meals.find({ user: req.user._id });
  if (!meals) {
    next(new ErrorResponse("Meals data not found", 404));
  }
  res.status(200).json({
    success: true,
    infor: meals,
  });
});

// GET api/meals/:id
exports.getOneMeals = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const meals = await Meals.findById(id);
  if (!meals) {
    next(new ErrorResponse("Meals data not found", 404));
  }
  res.status(200).json({
    success: true,
    infor: meals,
  });
});

// 식단 등록
// POST api/meals/
// POST api/user/:id/meals
exports.createMeal = asyncHandler(async (req, res, next) => {
  let { meal_type, calorie, meal_desc, meal_img } = req.body;
  if (!meal_type || !calorie || !meal_desc) {
    res.status(400).send();
  }
  if (!meal_img) {
    meal_img = "";
  }
  try {
    const meals = await Meals.create({
      meal_type,
      calorie,
      meal_desc,
      user: req.user._id,
      meal_img: meal_img,
    });
    res.status(200).json({ message: "식당 등록을 성공했습니다", meals });
  } catch (e) {
    console.error(e);
    res.status(500).send();
  }
});

// 식단 정보수정-댓글 -달기
// PUT api/meals/:id
exports.putMeal = asyncHandler(async (req, res, next) => {
  const { comment, user_id } = req.body;

  let meal = await Meals.findById(req.params.id);

  let comment1 = new Comment({
    comment: comment,
    user: req.user._id,
    content: meal._id,
    onModel: "Meals",
  });

  meal = await Meals.findByIdAndUpdate(
    { _id: meal._id },
    { $push: { comments: comment1 } },
    { new: true, runValidators: true }
  );
  await comment1.save();

  res.status(200).json({
    success: true,
    meal,
    comment1,
  });
});

// 칼로리 가져오기
// GET api/meals/cal
exports.getCalorie = asyncHandler(async (req, res, next) => {
  const { user_id } = req.params;
  if (!user_id) return res.status(404).send();
  try {
    const calorie = await Meals.findOne({ calorie });

    if (!calorie)
      return res.send({ message: "get user fail", error: "null of user" });
    res.send({ message: "get user success", user });
  } catch (e) {
    console.error(e);
    res.status(500).send();
  }
});

//=================================
//             User
//=================================
// img 등록하기
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".jpg") {
      return cb(res.status(400).end("only jpg"), false);
    }
    cb(null, true);
  },
});

let upload = multer({ storage: storage }).single("file");
exports.uploadfiles = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    return res.status(200).json({
      success: true,
      filePath: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
};
