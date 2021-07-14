const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const getCurrentDate = require("../lib/getCurrentDate");
const saltRounds = 10;

const UsersSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  token: {
    type: String,
  },
  create: {
    type: Date,
    default: getCurrentDate(),
  },
});

UsersSchema.pre("save", function (next) {
  // 비밀 번호 암호화 !

  const user = this;

  console.log("password", this.password);
  if (!user.isModified("password")) {
    next();
  }
  bcrypt.genSalt(saltRounds, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});
UsersSchema.methods.comparePassword = function (plainPassword, cb) {
  // planPassword
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);

    cb(null, isMatch);
  });
  // 암호화된 비밀번호
};

UsersSchema.methods.generateToken = function (cb) {
  const user = this;
  // jwt이용해서  토큰 생성
  const token = jwt.sign(user._id.toHexString(), "secretToken");

  // user._id + 'secretToken' = token

  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

UsersSchema.statics.findByToken = function (token, cb) {
  const user = this;
  // 토큰을 decode 한다.

  jwt.verify(token, "secretToken", function (err, decoded) {
    // 유저 아이디를 이용해서 유저를 찾은 다음에
    // 클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인

    user.findOne({ "_id": decoded, "token": token }, function (err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};

module.exports = mongoose.model("User", UsersSchema);
