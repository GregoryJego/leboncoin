import React, { useState } from "react";
import axios from "axios";

const Publish = props => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [file, setFile] = useState();
  const [isPublished, setIsPublished] = useState(false);

  return (
    <div className="wrapper">
      {isPublished ? (
        <div style={{ textAlign: "center" }}>Votre annonce est publiée !</div>
      ) : (
        <form
          className="white-box box-shadow"
          onSubmit={async event => {
            event.preventDefault();

            if (!props.user.token)
              alert("Veuillez vous identifier pour déposer une annonce.");
            else {
              const formData = new FormData();
              formData.append("title", title);
              formData.append("description", description);
              formData.append("price", price);
              formData.append("files", file);

              try {
                const response = await axios.post(
                  "https://leboncoin-api-gj.herokuapp.com/leboncoin-api/offer/publish",
                  formData,
                  {
                    headers: {
                      Authorization: "Bearer " + props.user.token
                    }
                  }
                );
                console.log("Voici la réponse : " + response);
                if (response) {
                  console.log("------- Annonce bien créée -------");
                  setIsPublished(true);
                }
              } catch (e) {
                alert(e.message);
              }
            }
          }}
        >
          <div className="big-font">Déposer une annonce</div>
          <hr />
          <div className="small-font">Titre de l'annonce</div>
          <input
            style={{ width: "100%" }}
            type="text"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
            }}
          />
          <div className="small-font">Texte de l'annonce</div>
          <textarea
            type="text"
            style={{
              resize: "none",
              width: "100%",
              height: "10rem",
              border: "1px solid #ccc"
            }}
            value={description}
            onChange={event => {
              setDescription(event.target.value);
            }}
          />
          <div className="small-font">Prix</div>
          <div>
            <input
              style={{ width: "30%" }}
              type="number"
              value={price}
              onChange={event => {
                setPrice(event.target.value);
              }}
            />
            <span> €</span>
          </div>
          <div className="small-font">Photo</div>
          <input
            type="file"
            onChange={event => {
              setFile(event.target.files[0]);
            }}
          />
          <button className="blue-bg" type="submit" style={{ width: "100%" }}>
            Valider
          </button>
        </form>
      )}
    </div>
  );
};

export default Publish;
