import React, { useState, useEffect } from "react";

import arrowImage from "../../assets/images/icon-arrow.svg";
import axios from "axios";

import "./Header.scss";
import IpAddressMap from "../IpAddressMap/IpAddressMap";

const Header = () => {
  const [inputVal, setInputVal] = useState("");
  const [query, setQuery] = useState();
  const [result, setResult] = useState();

  const [lat, setLat] = useState();
  const [long, setLong] = useState();

  const zoom = 14;

  useEffect(() => {
    getLocation();
  }, [query]);

  useEffect(() => {
    userIP();
  }, []);

  const userIP = async () => {
    const { data } = await axios.get("https://api.ipify.org/?format=json");

    await setQuery(data.ip);

    try {
      const response = await axios.get(
        `https://geo.ipify.org/api/v1?apiKey=at_BBgd3hcdxXMTCNhPQkm6RiaIejaZ1&ipAddress=${query}`
      );

      await setResult(response.data);
      setLat(response?.data?.location?.lat);
      setLong(response?.data?.location?.lng);
    } catch (e) {
      console.log(e);
    }
  };

  const getLocation = async () => {
    if (!query) {
      return;
    } else {
      try {
        const response = await axios.get(
          `https://geo.ipify.org/api/v1?apiKey=at_BBgd3hcdxXMTCNhPQkm6RiaIejaZ1&ipAddress=${query}`
        );

        await setResult(response.data);
        setLat(response?.data?.location?.lat);
        setLong(response?.data?.location?.lng);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const getSearch = (e) => {
    e.preventDefault();

    setQuery(inputVal);
    setInputVal("");
  };

  return (
    <main>
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

          {result ? (
            <div className="tracker__container">
              <div className="content">
                <h4 className="content__name">ip address</h4>
                <p className="content__value">{result?.ip}</p>
              </div>
              <div className="content">
                <h4 className="content__name">location</h4>
                <p className="content__value">
                  {result?.location?.city}, {result?.location?.region}, <br />
                  {result?.location?.postalCode}
                </p>
              </div>
              <div className="content">
                <h4 className="content__name">timezone</h4>
                <p className="content__value">
                  UTC {result?.location?.timezone}
                </p>
              </div>
              <div className="content">
                <h4 className="content__name">isp</h4>
                <p className="content__value">{result?.isp}</p>
              </div>
            </div>
          ) : (
            <span></span>
          )}
        </div>
      </header>
      {lat && long ? <IpAddressMap lat={lat} long={long} zoom={zoom} /> : ""}
    </main>
  );
};

export default Header;
