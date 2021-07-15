export default function formValidater(value, type) {
  let error = {};

  // register
  if (type === "register") {
    if (!value.id.length) {
      error.id = "ID 입렵 해주세요";
    } else if (value.id.length < 7) {
      error.id = "ID 를 7자 이상 써주세요";
    }

    if (value.passWord.length < 7) {
      error.passWord = "비밀번호 7자리 이상 입력해주세요";
    }

    if (!value.email) {
      error.email = "Email 입렵 해주세요";
    } else if (!/\S+@\S+\.\S+/.test(value.email)) {
      error.email = "Email 주소를 입렵 해주세요";
    }
    if (!value.name) {
      error.name = "이름을 입력 해주세요";
    }
  } else if (type === "workout") {
    // Workout
    if (!value.workoutType) {
      error.workoutType = "운동 종류를 입렵해주세요";
    }
    if (!value.hour) {
      error.hour = "시간을 입력 해주세요";
    }
    if (!value.workoutCalorie) {
      error.workoutCalorie = "칼로리를 입력 해주세요";
    }
  }

  return error;
}
