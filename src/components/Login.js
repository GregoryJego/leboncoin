import React, { useState } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Pour accéder à l'historique de navigation
  const history = useHistory();

  return (
    <>
      <form
        className="modal-content"
        onSubmit={async event => {
          // Bloque le chargement automatiquement de la page lors de la soumission du formulaire
          event.preventDefault();

          try {
            const response = await axios.post(
              "https://leboncoin-api-gj.herokuapp.com/leboncoin-api/user/log_in",
              {
                email: email,
                password: password
              }
            );

            // response.data contient :
            //   {
            //     "_id": "5bf53c45ad3fb30014389132",
            //     "token": "zcJ8DHdAFTPH2JV8wRDb50kL0IgkquESMC3XAJuduoEP717J2en46sjNX0kzcdCv",
            //     "account": {
            //         "username": "Farid"
            //     }
            // }

            if (response.data.token) {
              // 1. sauvegarder le token dans les cookies
              Cookie.set("token", response.data.token);

              // 2. fermer la modal
              props.setIsModalDisplayed(false);

              // 3. Mettre à jour l'état user
              props.setUser(response.data);
            } else {
              alert("An error occurred");
            }
          } catch (e) {
            alert(e.message);
          }

          // Naviguer vers une autre page
          // history.push("/offer/5dcc803be3e5c000154b03f2");

          // Naviguer vers la page precedente
          history.goBack();
        }}
      >
        <div className="big-font">Connexion</div>
        <hr />
        <div className="small-font">Adresse email</div>
        <input
          type="email"
          value={email}
          onChange={event => {
            // console.log(event.target.value); // farid@lereacteur.io
            setEmail(event.target.value);
          }}
        />
        <div className="small-font">Mot de passe</div>
        <input
          type="password"
          value={password}
          onChange={event => {
            setPassword(event.target.value);
          }}
        />
        <input className="modal-button" type="submit" value={"Se connecter"} />
        <div className="separator"></div>
        <div className="small-font" style={{ textAlign: "center" }}>
          Vous n'avez pas de compte ?
        </div>
        <Link
          to={"/sign_up"}
          onClick={() => {
            props.setIsModalDisplayed(false);
          }}
        >
          <button className="modal-button reverse">Créer un compte</button>
        </Link>
      </form>
      <div
        className="closemodal"
        onClick={() => {
          props.setIsModalDisplayed(false);
        }}
      >
        X
      </div>
    </>
  );
};

export default Login;
