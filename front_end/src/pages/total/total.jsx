import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TotalList from "./total_list";
import "../../scss/total.scss";
import { getTotal } from "../../modules/actions";
import TotalTimeline from "./total_timeline";
import Modals from "../../components/layout/modals/modal";

const Total = (props) => {
  const dispatch = useDispatch();
  const { timeline, workouts } = useSelector((state) => state.timeInfor);
  const { isLoggined } = useSelector((state) => state.user);

  const [totalLists, setTotalList] = useState([
    {
      id: "1",
      hour: "3", //
      term: "daily",
      name: "오늘 운동시간",
    },
    {
      id: "2",
      hour: "10", //
      term: "weekly",
      name: "이번주 총운동시간",
    },
    {
      id: "3",
      hour: "10", //
      term: "monthly",
      name: "이번달 총 운동시간",
    },
    {
      id: "4",
      hour: "50", //
      term: "total",
      name: "총 운동시간",
    },
  ]);
  const [isopen, setIsOpen] = useState(false);
  const [modalState, setModalState] = useState({});

  const [totalTimeline, setTotalTimeline] = useState({});

  const calculateTime = (workouts) => {
    const now = new Date();
    const today = new Date().getDate();
    const currentMonth = new Date().getMonth() + 1;
    let totalTime = {
      daily: 0,
      weekly: 0,
      monthly: 0,
      total: 0,
    };

    workouts.forEach((item) => {
      const {
        hour: { createdAt, hour },
      } = item;
      const date = new Date(createdAt).getDate();
      const month = new Date(createdAt).getMonth() + 1;
      const week = new Date(now.setDate(now.getDate() + 6));
      if (date === today) {
        totalTime.daily += hour;
      }
      if (week === today) {
        totalTime.weekly += hour;
      }

      if (month === currentMonth) {
        totalTime.monthly += hour;
      }
      totalTime.total += hour;
    });

    setTotalTimeline(totalTime);
    // for (let item of workouts) {
    //   const {
    //     hour: { createdAt, hour },
    //   } = item;
    //   const date = new Date(createdAt).getDate();
    //   const month = new Date(createdAt).getMonth() + 1;
    //   const week = new Date(now.setDate(now.getDate() + 6));
    //   if (date === today) {
    //     totalTime.daily += hour;
    //   }
    //   if (week === today) {
    //     totalTime.weekly += hour;
    //   }

    //   if (month === currentMonth) {
    //     totalTime.monthly += hour;
    //   }
    //   totalTime.total += hour;
    // }
  };

  // 비동기 !

  useEffect(() => {
    async function fetchData() {
      const {
        payload: { workoutData },
      } = await dispatch(getTotal());
      calculateTime(workoutData);
    }
    isLoggined && fetchData();
  }, [isLoggined]);

  return (
    <section className="total">
      <div className="total__wrap">
        {totalLists.map((totalList) => (
          <TotalList
            totalList={totalList}
            key={totalList.id}
            calculateList={totalTimeline}
          />
        ))}
      </div>
      <div className="total__wrapper">
        <div className="total__box">
          <h2 className="total__title">Time Line</h2>
          <Link to="/total/detail">
            <h2 className="total__h2">자세히 확인하기</h2>
          </Link>
        </div>

        <div className="total__wrap2">
          <table className="total__wrap2__table">
            <thead className="total__wrap2__thead">
              <tr>
                <th>아이콘</th>
                <th>TYPE</th>
                <th>DESC</th>
                <th>CAL</th>
                <th>CREATE</th>
              </tr>
            </thead>
            <tbody>
              {timeline.map((item) => (
                <TotalTimeline
                  timeLines={item} //
                  key={item._id}
                  isopen={isopen}
                  setIsOpen={setIsOpen}
                  setModalState={setModalState}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isopen ? (
        <Modals
          isopen={isopen}
          setIsOpen={setIsOpen}
          id={modalState._id}
          type={modalState.type}
        />
      ) : null}
    </section>
  );
};

export default Total;
