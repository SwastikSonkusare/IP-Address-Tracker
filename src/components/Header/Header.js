import React, { useState, useEffect } from "react";

import arrowImage from "../../assets/images/icon-arrow.svg";
import axios from "axios";

import "./Header.scss";

const Header = () => {
  const [inputVal, setInputVal] = useState("");
  const [query, setQuery] = useState();
  const [result, setResult] = useState();

  useEffect(() => {
  

    getGeoLocation();
  }, [query]);


  const getGeoLocation = async () => {
    if (!query) {
      return;
    } else {
      try {
        const response = await axios.get(
          `https://geo.ipify.org/api/v1?apiKey=at_BBgd3hcdxXMTCNhPQkm6RiaIejaZ1&ipAddress=${query}`
        );

        await setResult(response.data);
      } catch (e) {
        console.log(e);
      }
      console.log(result);
    }
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(inputVal);
    setInputVal("");
  };

  return (
    <header>
      <div className="tracker">
        <h1 className="tracker__title">IP Address Tracker</h1>
        <form className="tracker__input-container" onSubmit={getSearch}>
          <input
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            type="text"
            placeholder="Search for any IP address or domain..."
          ></input>
          <button type="submit" className="tracker__button">
            <img src={arrowImage} alt="arrow svg"></img>
          </button>
        </form>

        <div className="tracker__container">
          <div className="content">
            <h4 className="content__name">ip address</h4>
            <p className="content__value">{result?.ip}</p>
          </div>
          <div className="content">
            <h4 className="content__name">location</h4>
            <p className="content__value">{result?.location?.city}</p>
          </div>
          <div className="content">
            <h4 className="content__name">timezone</h4>
            <p className="content__value">{result?.location?.timezone}</p>
          </div>
          <div className="content">
            <h4 className="content__name">isp</h4>
            <p className="content__value">{result?.isp}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
