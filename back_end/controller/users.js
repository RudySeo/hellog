const path = require("path");
const User = require("../models/user");
const { auth } = require("../middleware/auth");
const ErrorResponse = require("../utils/erroRespons");
const asyncHandler = require("../middleware/async");
const getCurrentDate = require("../lib/getCurrentDate");

// 유저 리스트 조회
// / get users:id
exports.getusers = asyncHandler(async (req, res, next) => {
  const users = await User.find();
  // console.log(getCurrentDate(day));

  if (!users) {
    next(new ErrorResponse("Users data not found", 404));
  }
  res.status(200).json({
    success: true,
    count: users.length,
    data: users,
  });
});

// 유저 생성
// post users
exports.createUser = asyncHandler(async (req, res, next) => {
  const { user_id, email, name, password } = req.body;
  if (!user_id || !email) return res.status(404).send();
  
  try {
    let user = await User.findOne({ user_id });
    if (user) {
      return res.status(404).send({
        message: "create new user fail",
        error: "this user has already joined",
      });
    }
    console.log(password);
    user = await User.create({
      user_id,
      email,
      name,
      password,
    });

    res.send({ message: "create new user success", user });
  } catch (e) {
    console.error(e);
    res.status(500).send();
  }
});

// 개인 유저 조회
exports.getUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!id) return res.status(404).send();
  try {
    const user = await User.findOne({ user_id: id });
    if (!user)
      return res.send({ message: "get user fail", error: "null of user" });
    res.send({ message: "get user success", user });
  } catch (e) {
    console.error(e);
    res.status(500).send();
  }
});

// 로그인
// post/login
exports.login = asyncHandler((req, res, next) => {
  if (!req.body.user_id || !req.body.password) return res.status(404).send();

  // 요청된 아이뒤 데이터베이스에서 있는지 찾는다
  User.findOne({ user_id: req.body.user_id }, (err, user) => {
    if (!user) {
      return res.status(404).json({
        loginSuccess: false,
        message: "제공된 아이뒤에 해당하는 유저가 없습니다.",
      });
    }
    // 요청된 아이뒤 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호 인지 확인.
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.status(404).json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다",
        });
      }
      // 비밀 번호까지 맞다면 토큰 생성
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        // 토큰 저장 위치 (cookies)
        return res.status(200).cookie("x_auth", user.token).json({
          loginSuccess: true,
          statusCode: 200,
          userId: user._id,
          user: user,
        });
      });
    });
  });
});

// 로그인 AUTH
// get// auth

exports.myinfo = (req, res) => {
  // 여기 까지 미들웨어를 통과해 왔다는 애기는 authentication 이 true 라는 말

  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
  });
};

// 로그인 logout
// get// loout

exports.logout = (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    console.log("1234");

    if (err) return res.status(404).json({ success: false, err });
    return res.status(200).send({ success: true, user });
  });
};
