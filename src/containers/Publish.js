import React, { useState, useEffect } from "react";
import Dropzone from "react-dropzone";
import { useDropzone } from "react-dropzone";
import axios from "axios";

const Publish = props => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [filesToSend, setFilesToSend] = useState([]);
  const [isPublished, setIsPublished] = useState(false);

  let isEnabled = false;

  useEffect(() => {
    if (title && description && price) isEnabled = true;
  }, [title, description, price]);

  // Drop zone : preview
  const thumbsContainer = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16
  };

  const thumb = {
    display: "inline-flex",
    borderRadius: 2,
    border: "1px solid #eaeaea",
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: "border-box"
  };

  const thumbInner = {
    display: "flex",
    minWidth: 0,
    overflow: "hidden"
  };

  const img = {
    display: "block",
    width: "auto",
    height: "100%"
  };

  function Previews(props) {
    const [files, setFiles] = useState([]);
    const { getRootProps, getInputProps } = useDropzone({
      accept: "image/*",
      onDrop: acceptedFiles => {
        setFiles(
          acceptedFiles.map(file =>
            Object.assign(file, {
              preview: URL.createObjectURL(file)
            })
          )
        );
        setFilesToSend(acceptedFiles);
      }
    });

    const thumbs = files.map(file => (
      <div style={thumb} key={file.name}>
        <div style={thumbInner}>
          <img src={file.preview} style={img} />
        </div>
      </div>
    ));

    // useEffect(
    //   () => () => {
    //     // Make sure to revoke the data uris to avoid memory leaks
    //     files.forEach(file => URL.revokeObjectURL(file.preview));
    //   },
    //   [files]
    // );

    return (
      <section className="dropzone">
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <p>
            Glissez et déposez vos images ici, ou cliquez pour les sélectionner
          </p>
        </div>
        <aside style={thumbsContainer}>{thumbs}</aside>
      </section>
    );
  }

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
            else if (isEnabled) {
              const formData = new FormData();
              formData.append("title", title);
              formData.append("description", description);
              formData.append("price", price);
              formData.append("files", filesToSend);
              console.log("Voici les files transmises = " + filesToSend);
              try {
                const response = await axios.post(
                  "https://leboncoin-api-gj.herokuapp.com/offer/publish",
                  formData,
                  {
                    headers: {
                      Authorization: "Bearer " + props.user.token
                    }
                  }
                );
                console.log("Voici la réponse : " + response.data);
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
              min="0"
              value={price}
              onChange={event => {
                setPrice(event.target.value);
              }}
            />
            <span> €</span>
          </div>
          <div className="small-font">Photo</div>
          {/* <input
            type="file"
            onChange={event => {
              setFile(event.target.files[0]);
            }}
          /> */}
          <Previews />
          <button
            className={isEnabled + " modal-button"}
            type="submit"
            style={{ width: "100%" }}
          >
            Valider
          </button>
        </form>
      )}
    </div>
  );
};

export default Publish;
