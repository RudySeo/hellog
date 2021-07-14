import { useState } from "react";
import axios from "axios";
import Button from "../../components/common/button";
import Postinput from "../../components/common/post_input";
import Radio from "../../components/common/radio";
import Useform from "../../components/common/useform";
import { useHistory } from "react-router-dom";
import "../../scss/style.scss";

const CreateMeal = (props) => {
  const { form, handleChange } = Useform();
  const [img, setImage] = useState("../imgs/noimg.png");
  const [files, setfiles] = useState(null);
  const history = useHistory();

  const save = async (e) => {
    try {
      e.preventDefault();
      const config = {
        header: {
          "content-type": "multipart/form-data",
        },
        withCredentials: true,
      };
      const formdata = new FormData();
      formdata.append("file", files);

      const response = await axios.post(
        "http://localhost:3601/api/meals/uploadfiles",
        formdata,
        config
      );

      console.log(response.data.filePath);
      const infor = {
        meal_desc: form.mealDesc,
        calorie: form.calorie,
        meal_type: form.mealType,
        meal_img: response.data.filePath,
      };
      const { data } = await axios.post(
        "http://localhost:3601/api/meals",
        infor,
        {
          withCredentials: true,
        }
      );
      console.log(data);
      history.push("/total");
      alert("성공했습니다");
    } catch (error) {
      console.log(error);
      alert("실패하였습니다");
    }
  };

  const onfileClick = () => {
    const imgtag = document.getElementById("test");
    imgtag.click();
  };

  const onChangeFileReader = (e) => {
    if (!e.target.files[0]) {
      const file = null;
      setfiles(file);
      setImage("../imgs/noimg.png");
      return;
    }
    const file = e.target.files[0];
    setfiles(file);
    const Image = URL.createObjectURL(file);
    setImage(Image);
  };

  return (
    <section className="section_padding">
      <div className="post__meals">
        <span>
          <img
            onClick={onfileClick}
            className="post__meals__img"
            src={img}
            alt="no_img"
          />
        </span>
        <form className="post__meals__padding">
          <label htmlFor="test">
            <input id="test" hidden type="file" onChange={onChangeFileReader} />
          </label>

          <Postinput
            title={"음식종류"}
            type={"text"}
            name={"mealDesc"}
            value={form.mealDesc}
            onChange={handleChange}
            placeholder={"오늘 먹은 음식을 등록해주세요"}
          />
          <div className="post__meals__checkBox">
            <h2 className="post__title">식사시간</h2>
            <Radio
              id="box1"
              type={"아침"}
              name={"mealType"}
              value={form.mealType1}
              onChange={handleChange}
            />
            <Radio
              id="box2"
              type={"점심"}
              name={"mealType"}
              value={form.mealType2}
              onChange={handleChange}
            />
            <Radio
              id="box3"
              type={"저녁"}
              name={"mealType"}
              value={form.mealType3}
              onChange={handleChange}
            />
          </div>

          <Postinput
            onChange={handleChange}
            name={"calorie"}
            type={"text"}
            title={"칼로리"}
            value={form.calorie}
            placeholder={"칼로리를 입력 해주세요"}
          />
          <Button onClick={save}>저장</Button>
        </form>
      </div>
    </section>
  );
};

export default CreateMeal;
