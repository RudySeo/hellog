const ErrorResponse = require("../utils/erroRespons");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  console.log(err.name);

  //   MOGO bad objectId
  if (err.name === "CastError") {
    const message = "REsource not found";
    error = new ErrorResponse(message, 404);
  }

  //   값이 같은 경우에 대한 에러 Duplicate
  if ((err.code = 11000)) {
    const message = "Duplicate  filed valie entered";
    error = new ErrorResponse(message, 400);
  }

  //   match 키워드 -> 유효성 검사에서 실패했을 경우
  if ((err.name = "ValidationError")) {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 404);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "server Error",
  });
};

module.exports = errorHandler;
