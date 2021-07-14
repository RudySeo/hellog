const { Schema, model, STATES } = require("mongoose");
const { CommentSchema } = require("./comment");
const getCurrentDate = require("../lib/getCurrentDate");
const MealsSchema = new Schema({
  meal_type: {
    type: String, //
    require: [true, "아침,점심,저녁 선택해주세요!!"],
    enum: ["아침", "점심", "저녁"],
  },
  calorie: {
    type: Number,
  },
  meal_desc: {
    type: [String],
    require: [true, "오늘 먹은 음식을 적어주세요"],
  },
  comments: {
    type: [CommentSchema],
  },
  create: {
    type: Date,
    default: getCurrentDate(),
  },
  meal_img: {
    type: String,
    default: "",
  },
  user: {
    type: Schema.ObjectId,
    ref: "User",
    require: true,
  },
});
module.exports = model("Meals", MealsSchema);
