const { model, Schema } = require("mongoose");

const CommentSchema = new Schema({
  //댓글 
  comment: {
    type: String,
    required: true,
  },
  //주인
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    requried: true,
  },
  //댓글이 담긴 콘텐츠 
  content: {
    type: Schema.Types.ObjectId,
    refPath: "onModel",
    required: true,
  },
  //콘텐츠의 타입 
  onModel: {
    type: String,
    required: true,
    enum: ["Meals", "Workout"],
  },
});
const Comment = model("Comment", CommentSchema);
module.exports = { CommentSchema, Comment };
