import React, { useState } from "react";
import "../style/HomePageStyle.css";
import axios from "axios";

export default function HomePage() {
  const [data, setData] = useState({
    celcius: 10,
    name: "Colombo",
    humidity: 10,
    speed: 2,
  });
  const [name, setName] = useState("");

  const handleClick = () => {
    if (name !== "") {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=102d463c1f601db0bb76fd7f835bc806&units=matric`;
      axios
        .get(apiUrl)
        .then((res) => {
          console.log(res.data);
          setData({
            ...data,
            celcius: res.data.main.temp,
            name: res.data.name,
            humidity: res.data.main.humidity,
            speed: res.data.wind.speed,
          });
          console.log(res);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="main-container">
      <div className="main-div">
        <div className="d1">
          <p>13 c</p>
          <br />
          <p>Colombo</p>
        </div>
        <div className="d3">
          <input
            type="search"
            name=""
            id=""
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={handleClick}>Search</button>
        </div>
        <div className="d2">
          <p>4:02 PM</p>
          <p>2023/09/02,Saturday</p>
        </div>
      </div>
    </div>
  );
}
