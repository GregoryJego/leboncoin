import React from "react";

const OfferCard = props => {
  const dateCreated = new Date(props.created);
  const date =
    dateCreated.toLocaleDateString() + " à " + dateCreated.toLocaleTimeString();
  const id = props["_id"];

  return (
    <div className="offercard">
      <div className="offercard-img-frame">
        <img
          className="offercard-img"
          src={props.pictures[0]}
          alt={props[id]}
        />
      </div>
      <div className="offercard-infos">
        <div className="offercard-title">{props.title}</div>
        <div className="offercard-price">{props.price} €</div>
        <div className="offercard-date">{date}</div>
      </div>
    </div>
  );
};

export default OfferCard;
