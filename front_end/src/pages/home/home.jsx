import React from "react";
import "../../scss/style.scss";

const Home = (props) => {
  return (
    <div className="home">
      <div className="home__logo">
        <img src="../imgs/home_logo.png" alt="" />
      </div>
      <div className="home__box">
        <h1>오늘의 당신은 어디까지 도달했습니까</h1>
      </div>
    </div>
  );
};

export default Home;
