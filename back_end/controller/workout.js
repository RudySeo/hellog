const path = require("path");
const ErrorResponse = require("../utils/erroRespons");
const asyncHandler = require("../middleware/async");

const Workout = require("../models/workout");
const User = require("../models/user");
const { Comment } = require("../models/comment");
const getCurrentDate = require("../lib/getCurrentDate");
const meals = require("../models/meals");

// ## Workouts

// 운동 리스트 조회

// GET api/workouts-
exports.getWorkOut = asyncHandler(async (req, res, next) => {
  const workout = await Workout.find({ user: req.user._id });
  if (!workout.length) {
    next(new ErrorResponse("Workout data not found", 404));
  }
  res.status(200).json({
    success: true,
    infor: workout,
  });
});

// GET api/workouts:id
//운동 리스트 가져오기

exports.getOneWorkOut = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const workout = await Workout.findById(id);
  if (!workout) {
    next(new ErrorResponse("Workout data not found", 404));
  }
  res.status(200).json({
    success: true,
    infor: workout,
  });
});

// / 운동 정보 등록

// //  POST api/workouts`

exports.createWorkout = asyncHandler(async (req, res, next) => {
  const { workout_type, hour, workout_calorie } = req.body;
  if (!workout_type || !hour || !workout_calorie) {
    res.status(400).send();
  }
  try {
    const workout = await Workout.create({
      workout_type,
      hour,
      workout_calorie,
      user: req.user._id,
    });

    res.send({ message: "운동 등록 완료 했습니다", workout });
  } catch (e) {
    console.error(e);
    res.status(500).send();
  }
});

// 운동 정보수정  - 댓글 달기

//  PUT api/workouts/:id
exports.putWorkout = asyncHandler(async (req, res, next) => {
  const { comment, user_id } = req.body;

  let workout = await Workout.findById(req.params.id);
  // =>_id findOne({_id:req.params.id})
  const comment1 = Comment({
    comment: comment,
    user: user_id,
    content: workout._id,
    onModel: "Workout",
  });
  // [workout,comment] = await
  workout = await Workout.findByIdAndUpdate(
    { _id: workout._id },
    { $push: { comments: comment1 } },
    { new: true, runValidators: true }
  );
  await comment1.save();
  res.status(200).json({ success: true, workout, comment1 });
});
