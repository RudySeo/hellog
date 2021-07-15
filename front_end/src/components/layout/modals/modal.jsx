import React, { useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import "../../../scss/style.scss";
import axios from "axios";
const Modals = ({ id, type, isopen, setIsOpen }) => {
  const modalsRef = useRef();
  const [workout, setWorkout] = useState({
    // create: "02.12",
    // workout_type: "조깅",
    // hour: "2",
    // workout_calorie: "120kcal",
    // _id: "1",
  });

  const [meals, setMeals] = useState({
    // _id: 1,
    // create: "02.12",
    // meal_type: "아침",
    // meal_desc: ["수박"],
    // calorie: 200,
  });
  const [comments, setComments] = useState([
    {
      _id: "",
      comment: "계속 운동 해주세요",
      user: "60a125dfa801204acd2810d5",
      content: "60a125dfa801204acd2810d5",
      onModel: "Meals",
    },
  ]);

  const [postcomments, setpostcomments] = useState({
    comment: "",
    user_id: "",
  });

  // Modal close
  const toggleModal = (e) => {
    e.stopPropagation();
    setIsOpen(!isopen);
  };

  // Modal close  outSide close
  const handleClickOutside = ({ target }) => {
    if (isopen && !modalsRef.current.contains(target)) setIsOpen(false);
  };

  // Meals API 가져오기
  const getMeals = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3601/api/meals/${id}`);
      let meals = data.infor;
      meals.time = Time(meals.create);
      meals.create = getMD(meals.create);

      setMeals(meals);
      setComments(meals.comments);
    } catch (error) {
      console.log(error);
    }
  };

  // Workout API 가져오기
  const getWorkout = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3601/api/workout/${id}`
      );
      // 날짜 변경
      const workout = data.infor;
      workout.create = getMD(workout.create);

      setWorkout(workout);
      setComments(workout.comments);
    } catch (error) {
      console.log(error);
    }
  };

  // Meals or Workout = 타입 분류
  const getData = () => {
    if (type === "meals") {
      getMeals();
    } else if (type === "workout") {
      // workouts();
      getWorkout();
    }
  };

  useEffect(() => {
    // 데이터 가져오기
    getData();
    // Modal close  outSide close
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // 날짜 만들기
  function getMD(create) {
    const d = new Date(create);
    const md = d.getMonth() + 1 + "." + d.getDate(); // 데이터 객체 에서 월 , 일 만 가지고 와서 문자열로 만들어 준다
    return md;
  }

  function Time(create) {
    const time = create.split("T")[1];
    const time2 = time.split(".")[0];
    return time2;
  }

  const commentOnSumit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3601/api/${type}/${id}`, postcomments, {
        withCredentials: true,
      });
      getData();
      setpostcomments({
        comment: "",
      });
    } catch (e) {
      console.log(e);
    }
  };
  const commet_Change = (e) => {
    setpostcomments({
      comment: e.target.value,
    });
  };

  return (
    <div className="modal__box">
      <div className="modal" ref={modalsRef}>
        <div className="modal__wrap">
          <span className="modal__btn" onClick={toggleModal}>
            <img src="../imgs/close.png" alt="btn" />
          </span>
          {type === "workout" && (
            <table className="modal__table">
              {/* workout 테이블 */}
              <thead>
                <tr>
                  <th>날짜</th>
                  <th>운동종류</th>
                  <th>운동시간</th>
                  <th>소비칼로리</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{workout.create}</td>
                  <td>{workout.workout_type}</td>
                  <td>{workout.hour}h</td>
                  <td>{workout.workout_calorie}Kal</td>
                </tr>
              </tbody>
            </table>
          )}
          {/* // meals table */}
          {type === "meals" && meals.meal_img && (
            <img src={"http://localhost:3601/" + meals.meal_img} alt="img" />
          )}
          {type === "meals" && (
            <table className="modal__table">
              <thead>
                <tr>
                  <th>날짜</th>
                  <th>식사시간</th>
                  <th>식사 분류</th>
                  <th>칼로리</th>
                </tr>
              </thead>
              <tbody>
                {/* 날짜	식사시간	아침/점심/저녁	식단 내역	칼로리 */}
                <tr>
                  <td>{meals.create}</td>
                  <td>{meals.meal_type}</td>
                  <td>{meals.meal_desc}</td>
                  <td>{meals.calorie}Kal</td>
                </tr>
              </tbody>
            </table>
          )}
          {/* 댓글  */}

          <form className="comment" onSubmit={commentOnSumit}>
            <h2 className="comment__title">코멘트 남기기</h2>
            <input
              className="comment__input"
              type="text"
              placeholder="댓글을 입렵해주세요!"
              onChange={commet_Change}
              value={postcomments.comment}
            />
            <button className="comment__sumit">등록</button>
            <div className="comment__list">
              <h2 className="comment__title">{comments.length}</h2>
              <ul>
                {comments.map((comment) => (
                  <li key={comment._id}>{comment.comment}</li>
                ))}
              </ul>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modals;
