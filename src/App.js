import React, { useEffect, useState } from "react";
import { getAPIData } from "./api/axios";
import "./app.css";
import Loading from "./components/Loading/Loading";
import searchIcon from "./images/icon_search.svg";
import { LocationInput } from "./components/LocationInput/LocationInput";

function App() {
  const [data, setData] = useState(null);
  const [main, setMain] = useState(null);
  const [location, setLocation] = useState("");
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [search, setSearch] = useState(false);
  const [city, setCity] = useState("seoul");

  const APIKeyword = {
    city,
    key: process.env.REACT_APP_API_KEY,
  };

  const fetchData = async () => await getAPIData(APIKeyword);

  useEffect(() => {
    fetchData().then((res) => {
      console.log(res);
      setData(res.data);
      setMain(res.data.main);
      setLocation({
        city: res.data.name,
        country: res.data.sys.country,
      });
      setWeatherInfo(res.data.weather[0]);
    });
  }, [city]);

  console.log(city);

  // if (!!data) {
  //   console.log(data);
  //   console.log(main);
  //   console.log(location);
  //   console.log(weatherInfo);
  // }

  const handleSearchToggle = () => {
    search ? setSearch(false) : setSearch(true);
  };

  return (
    <article id="weather_info">
      {data ? (
        <>
          {!search ? (
            <header className="header">
              <h1 className="city">
                {location.city} / {location.country}
              </h1>
              <button className="searchBtn" onClick={handleSearchToggle}>
                <img src={searchIcon} alt="찾기 버튼" />
              </button>
            </header>
          ) : (
            <LocationInput
              setCity={setCity}
              onSearchToggle={handleSearchToggle}
            />
          )}
          <section>
            <h2 className="weather_condition">{weatherInfo.main}</h2>
            <figure className="icon">
              <img
                src={`http://openweathermap.org/img/wn/${weatherInfo.icon}.png`}
                alt=""
              />
            </figure>
          </section>
          <section>
            <h2>현재 온도</h2>
            <div className="cont_temp">
              <strong className="temp">
                {parseInt(main.temp - 273.15)} &deg;
              </strong>
              <div>
                <span className="temp_max">
                  최대 : {parseInt(main.temp_max - 273.15)} &deg;
                </span>
                <span className="temp_min">
                  최저 : {parseInt(main.temp_min - 273.15)} &deg;
                </span>
              </div>
            </div>
          </section>
        </>
      ) : (
        <Loading />
      )}
    </article>
  );
}

export default App;
