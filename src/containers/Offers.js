import React, { useState, useEffect } from "react";
import OfferCard from "../components/OfferCard";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [search, setSearch] = useState("");
  const reg = new RegExp(search, "i");

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://leboncoin-api-gj.herokuapp.com/offers"
        // "http://localhost:4000/offers"
      );
      console.log(Object.keys(response.data));
      if (Object.keys(response.data).length === 0)
        console.log("---- No offer available ----");
      setData(response.data);
      console.log("response : ");
      console.log(response.data);
    } catch (e) {
      alert("An error occurred");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section>
      <div className="wrapper offers-main">
        <div className="ellipse"></div>
        <div className="searchbox box-shadow">
          <div className="offers-search-input">
            <svg
              className="offers-search-input-logo"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="currentColor"
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
              value={search}
              onChange={event => setSearch(event.target.value)}
            ></input>
          </div>
          <button className="blue-bg">
            <div className="button-title">Rechercher</div>
          </button>
        </div>
        {isLoading === true ? (
          <div className="loader" style={{ marginBottom: "2rem" }}></div>
        ) : (
          <div className="offers-main">
            {!data ? (
              <div style={{ marginBottom: "2rem" }}>
                Aucune offre disponible
              </div>
            ) : (
              <>
                {data.map(offer => {
                  const id = offer["_id"];
                  return (
                    <>
                      {reg.test(offer.title) && (
                        <Link
                          key={id}
                          className="offercard"
                          to={"/offer/" + id}
                        >
                          <OfferCard {...offer} />
                        </Link>
                      )}
                    </>
                  );
                })}
              </>
            )}
          </div>
        )}

        <ul className="pages" style={{ marginBottom: "1rem" }}>
          <li>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.835 3.86998L16.055 2.09998L6.16504 12L16.065 21.9L17.835 20.13L9.70504 12L17.835 3.86998Z"
                fill="#336699"
                fill-opacity="0.5"
              />
            </svg>
          </li>
          <li>1</li>
          <li>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.16504 20.13L7.93504 21.9L17.835 12L7.93504 2.09998L6.16504 3.86998L14.295 12L6.16504 20.13H6.16504Z"
                fill="#336699"
              />
            </svg>
          </li>
        </ul>
      </div>
    </section>
  );
};
export default Home;
