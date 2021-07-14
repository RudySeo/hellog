const User = require("../models/user");

let auth = (req, res, next) => {
  // 인증 처리하는곳

  // 클라이언트에서 쿠키에서 토큰을 가지고 온다
  let token = req.cookies.x_auth;
  console.log(token);
  // 토큰을 복호화 한후 유저를 찾는다.
  User.findByToken(token, (err, user) => {
    if (!user) {
      console.log("null", "토큰 지금 확인!!!");
    }
    if (err) throw err;
    if (!user) return res.status(404).json({ isAuth: false, error: true });

    req.token = token;
    // req 넣어 주는 이유는 토큰 값과 유저 값을 컨트롤에서 사용할려고 하는것
    req.user = user;
    next();
  });
  // 유저가 있으면 인증 한다

  // 유저가 없으면 인즌 하지 못한다
};

module.exports = { auth };
