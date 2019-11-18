import React, { useState, useEffect } from "react";
import OfferCard from "../components/OfferCard";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://leboncoin-api.herokuapp.com/api/offer/with-count"
      );
      setData(response.data.offers);
      setIsLoading(false);
    } catch (e) {
      alert("An error occurred");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section>
      <div className="wrapper offers-main">
        <div className="ellipse"></div>
        <div className="searchbox">
          <form>
            <div className="offers-search-input">
              <svg
                className="offers-search-input-logo"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.965 11.255H12.755L17.745 16.255L16.255 17.745L11.255 12.755V11.965L10.985 11.685C9.845 12.665 8.365 13.255 6.755 13.255C3.165 13.255 0.255005 10.345 0.255005 6.755C0.255005 3.165 3.165 0.255005 6.755 0.255005C10.345 0.255005 13.255 3.165 13.255 6.755C13.255 8.365 12.665 9.845 11.685 10.985L11.965 11.255ZM2.255 6.755C2.255 9.245 4.26501 11.255 6.755 11.255C9.245 11.255 11.255 9.245 11.255 6.755C11.255 4.26501 9.245 2.255 6.755 2.255C4.26501 2.255 2.255 4.26501 2.255 6.755Z"
                  fill="#8191A0"
                />
              </svg>
              <input
                className="offers-search-input-inside"
                placeholder="Que recherchez-vous ?"
                type="text"
              ></input>
            </div>
            <button className="offers-search-button">Rechercher</button>
          </form>
        </div>
        {isLoading === true ? (
          <div className="loader">
            <div></div>
            <div></div>
            <div></div>
          </div>
        ) : (
          <div className="offers">
            {data.map(offer => {
              const id = offer["_id"];
              return (
                <Link
                  key={id}
                  className="offercard"
                  to={"/offer/" + id}
                  params={{ testValue: "TEST" }}
                >
                  <OfferCard {...offer} />
                </Link>
              );
            })}
          </div>
        )}
      </div>
      <ul className="pages">
        <li>1</li>
        <li>2</li>
        <li>3</li>
      </ul>
    </section>
  );
};
export default Home;
