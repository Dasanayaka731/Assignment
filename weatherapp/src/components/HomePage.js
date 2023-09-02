import React, { useEffect, useState } from "react";
import "../style/HomePageStyle.css";
import axios from "axios";

export default function HomePage() {
  const [celcius, setCelcius] = useState(0);
  const [name, setName] = useState("Colombo");
  const [humidity, setHumidity] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [searchName, setSearchName] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Colombo&appid=102d463c1f601db0bb76fd7f835bc806&units=metric`;
    axios
      .get(apiUrl)
      .then((res) => {
        console.log(res.data);
        setCelcius(res.data.main.temp);
        setName(res.data.name);
        setHumidity(res.data.main.humidity);
        setSpeed(res.data.wind.speed);
      })
      .catch((err) => {
        console.error(err);
      });

    // Fetch and update current time and date
    const intervalId = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
      setCurrentDate(now.toLocaleDateString());
    }, 1000); // Update every 1 second

    return () => {
      // Cleanup the interval on component unmount
      clearInterval(intervalId);
    };
  }, []);

  const handleClick = () => {
    if (searchName !== "") {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchName}&appid=102d463c1f601db0bb76fd7f835bc806&units=metric`;
      axios
        .get(apiUrl)
        .then((res) => {
          console.log(res.data);
          setCelcius(res.data.main.temp);
          setName(res.data.name);
          setHumidity(res.data.main.humidity);
          setSpeed(res.data.wind.speed);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <div className="main-container">
      <div className="main-div">
        <div className="d1">
          <p>{celcius}°C</p>
          <p>{name}</p>
        </div>
        <div className="d3">
          <input
            type="search"
            name=""
            id=""
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <button onClick={handleClick}>Search</button>
        </div>
        <div className="d2">
          <p>{currentTime}</p>
          <p>{currentDate}</p>
        </div>
      </div>
    </div>
  );
}
