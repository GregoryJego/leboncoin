import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Error from "./Error";
import axios from "axios";

const Offer = props => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/leboncoin-api/offer/" + id
      );
      setData(response.data);
      console.log("Voici la réponse : " + response.data);
      setIsLoading(false);
    } catch (e) {
      alert("An error occurred");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Si l'id n'est pas dans les data reçues, alors on redirige vers la page d'erreur
  // if (!props[id]) return <Error />;

  return (
    <section className="offer-page">
      {isLoading ? (
        <div className="loader"></div>
      ) : (
        <>
          <div>
            <div className="offer-card box-shadow">
              <div className="img-frame">
                <img className="img" src={data.pictures[0]} />{" "}
              </div>
              <div className="offer-infos">
                <div className="offercard-title">{data.title}</div>
                <div className="offercard-price">{data.price} €</div>
                <div className="offercard-date">
                  {new Date(data.created).toLocaleDateString() +
                    " à " +
                    new Date(data.created).toLocaleTimeString()}
                </div>
              </div>
            </div>
            <div className="offercard-desc">
              Description<div className="offer-desc">{data.description}</div>
            </div>
          </div>
          <aside>
            <div className="offer-aside box-shadow">
              {data.creator.account.username}
            </div>
          </aside>{" "}
        </>
      )}
    </section>
  );
};

export default Offer;
