import React, { useState, useEffect } from "react";
import axios from "axios";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";

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

  const MyUploader = () => {
    // specify upload params and url for your files
    const getUploadParams = ({ meta }) => {
      return { url: "https://httpbin.org/post" };
    };

    // called every time a file's `status` changes
    const handleChangeStatus = ({ meta, file }, status) => {
      console.log(status, meta, file);
    };

    // receives array of files that are done uploading when submit button is clicked
    const handleSubmit = (files, allFiles) => {
      console.log(files.map(f => f.meta));
      setFilesToSend(files);
      allFiles.forEach(f => f.remove());
    };

    return (
      <Dropzone
        getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        onSubmit={handleSubmit}
        accept="image/*,audio/*,video/*"
      />
    );
  };

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
          <MyUploader />{" "}
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
