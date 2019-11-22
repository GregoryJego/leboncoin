import React from "react";

const OfferCard = props => {
  const dateCreated = new Date(props.created);
  const date =
    dateCreated.toLocaleDateString() + " à " + dateCreated.toLocaleTimeString();
  const id = props["_id"];

  return (
    <div className="offercard box-shadow">
      <div className="offercard-img-frame">
        {props.pictures[0] ? (
          <img
            className="offercard-img"
            src={props.pictures[0]}
            alt={"picture " + props[id]}
            onError={e => {
              e.target.onerror = null;
              e.target.src =
                "https://icon-library.net/images/no-image-available-icon/no-image-available-icon-6.jpg";
              e.target.alt = "picture missing";
            }}
          />
        ) : (
          <img
            className="offercard-img"
            src="https://icon-library.net/images/no-image-available-icon/no-image-available-icon-6.jpg"
            alt="picture missing"
          />
        )}
      </div>
      <div className="offercard-infos">
        <div className="offercard-title">{props.title}</div>
        <div className="offercard-price">{props.price ? props.price : 0} €</div>
        <div className="offercard-date">{date}</div>
      </div>
    </div>
  );
};

export default OfferCard;
