import React, { useState } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import { useHistory } from "react-router-dom";

const SignUp = props => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordconfirmation, setPasswordconfirmation] = useState("");
  const [cgv, setCGV] = useState(false);
  const [isErrorMessageDisplayed, setIsErrorMessageDisplayed] = useState(false);

  const history = useHistory();

  let isEnabled = false;

  if (cgv && username && email && password === passwordconfirmation)
    isEnabled = true;

  return (
    <div className="signup-container">
      <ul className="signup-side">
        Pourquoi créer un compte ?
        <li className="item">
          <svg
            width="42"
            height="42"
            viewBox="0 0 42 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M20.9825 3.5C11.3225 3.5 3.5 11.34 3.5 21C3.5 30.66 11.3225 38.5 20.9825 38.5C30.66 38.5 38.5 30.66 38.5 21C38.5 11.34 30.66 3.5 20.9825 3.5ZM21 35C13.265 35 7 28.735 7 21C7 13.265 13.265 7 21 7C28.735 7 35 13.265 35 21C35 28.735 28.735 35 21 35ZM19.25 12.25H21.875V21.4375L29.75 26.11L28.4375 28.2625L19.25 22.75V12.25Z"
              fill="#4183D7"
            />
          </svg>
          <div className="item-infos">
            <div className="item-title">Gagnez du temps</div>
            <div className="item-content">
              Publiez vos annonces rapidement, avec vos informations
              pré-remplies chaque fois que vous souhaitez déposer une nouvelle
              annonce.
            </div>
          </div>
        </li>
        <li className="item">
          <svg
            width="42"
            height="42"
            viewBox="0 0 42 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M31.5 27.5625V18.8125C31.5 13.44 28.6475 8.9425 23.625 7.7525V6.5625C23.625 5.11 22.4525 3.9375 21 3.9375C19.5475 3.9375 18.375 5.11 18.375 6.5625V7.7525C13.37 8.9425 10.5 13.4225 10.5 18.8125V27.5625L7 31.0625V32.8125H35V31.0625L31.5 27.5625ZM21 38.0625C22.925 38.0625 24.5 36.4875 24.5 34.5625H17.5C17.5 36.4875 19.075 38.0625 21 38.0625ZM14 29.3125H28V18.8125C28 14.4725 25.3575 10.9375 21 10.9375C16.6425 10.9375 14 14.4725 14 18.8125V29.3125Z"
              fill="#4183D7"
            />
          </svg>
          <div className="item-infos">
            <div className="item-title">Soyez les premiers informés</div>
            <div className="item-content">
              Créez des alertes Immo ou Emploi et ne manquez jamais l’annonce
              qui vous intéresse.
            </div>
          </div>
        </li>
        <li className="item">
          <svg
            width="42"
            height="42"
            viewBox="0 0 42 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M1.75 21C4.7775 13.3175 12.25 7.875 21 7.875C29.75 7.875 37.2225 13.3175 40.25 21C37.2225 28.6825 29.75 34.125 21 34.125C12.25 34.125 4.7775 28.6825 1.75 21ZM36.435 21C33.5475 15.1025 27.6325 11.375 21 11.375C14.3675 11.375 8.45254 15.1025 5.56504 21C8.45254 26.8975 14.35 30.625 21 30.625C27.65 30.625 33.5475 26.8975 36.435 21ZM21 16.625C23.415 16.625 25.375 18.585 25.375 21C25.375 23.415 23.415 25.375 21 25.375C18.585 25.375 16.625 23.415 16.625 21C16.625 18.585 18.585 16.625 21 16.625ZM13.125 21C13.125 16.66 16.66 13.125 21 13.125C25.34 13.125 28.875 16.66 28.875 21C28.875 25.34 25.34 28.875 21 28.875C16.66 28.875 13.125 25.34 13.125 21Z"
              fill="#4183D7"
            />
          </svg>
          <div className="item-infos">
            <div className="item-title">Visibilité</div>
            <div className="item-content">
              Suivez les statistiques de vos annonces (nombre de fois où votre
              annonce a été vue, nombre de contacts reçus).
            </div>
          </div>
        </li>
      </ul>
      <div className="signup-side" style={{ textAlign: "center" }}>
        Créez un compte
        <hr />
        <form
          className="signup-right-infos"
          onSubmit={async event => {
            // Bloque le chargement automatiquement de la page lors de la soumission du formulaire
            event.preventDefault();
            // console.log("Email : " + email);
            // console.log("Username : " + username);
            // console.log("Password : " + password);

            if (isEnabled) {
              try {
                const response = await axios.post(
                  "https://leboncoin-api-gj.herokuapp.com/user/sign_up",
                  {
                    email: email,
                    username: username,
                    password: password
                  }
                );

                if (response.data.token) {
                  // 1. sauvegarder le token dans les cookies
                  Cookie.set("token", response.data.token);

                  // 3. Mettre à jour l'état user
                  props.setUser(response.data);
                  // Naviguer vers la page precedente
                  history.goBack();
                } else {
                  alert("An error occurred");
                }
              } catch (e) {
                alert(e.message);
              }

              // Naviguer vers une autre page
              // history.push("/offer/5dcc803be3e5c000154b03f2");
            } else alert("Erreur dans le formulaire");
          }}
        >
          <div className="signup-right-content">
            <div className="text-secondaire">Pseudo</div>
            <input
              type="text"
              value={username}
              onChange={event => {
                // console.log(event.target.value); // farid@lereacteur.io
                setUsername(event.target.value);
              }}
            />
            <div className="text-secondaire">Adresse email</div>
            <input
              type="email"
              value={email}
              onChange={event => {
                setEmail(event.target.value);
              }}
            />
            <div className="password">
              <div>
                <div className="text-secondaire">Mot de passe</div>
                <input
                  type="password"
                  value={password}
                  onChange={event => {
                    setPassword(event.target.value);
                  }}
                />
              </div>
              <div>
                <div className="text-secondaire">Confirmer le mot de passe</div>
                <input
                  type="password"
                  value={passwordconfirmation}
                  onBlur={() => {
                    setIsErrorMessageDisplayed(true);
                  }}
                  onChange={event => {
                    setPasswordconfirmation(event.target.value);
                  }}
                />
                {isErrorMessageDisplayed === true &&
                  password !== passwordconfirmation && (
                    <div className="text-erreur">
                      Les mots de passe saisis sont différents.Veuillez
                      réessayer.
                    </div>
                  )}
              </div>
            </div>
            <div className="check">
              <input
                type="checkbox"
                checked={cgv}
                onChange={event => {
                  setCGV(event.target.checked);
                }}
              />
              <div>
                "J’accepte les Conditions Générales de Vente et les Conditions
                Générales d’Utilisation"
              </div>
            </div>
            <input
              className={isEnabled + " modal-button"}
              type="submit"
              value={"Créer mon Compte Personnel"}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
