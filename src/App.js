import React, {useState} from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Offers from "./containers/Offers";
import Offer from "./containers/Offer";
import Footer from "./components/Footer";

import Cookies from "js-cookie";

import "./App.css";
import "./reset.css";

function App() {
  const userCookie = Cookies.get("user");
  const [user, setUser] = useState(userCookie);
  const [usernameInput, setUsernameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const [showModal, setShowModal] = useState(false);

  return (
    <Router>
        {showModal === true && (
        <div className="modal">
          <div className="modal-content">
          <p className="text-principal">Connexion</p>
          <hr />
          <p className="text-secondaire">Adresse email</p>
          <input type="email"value={emailInput}
            onChange={event => setEmailInput(event.target.value)} />
          <p className="text-secondaire" value={passwordInput}
            onChange={event => setPasswordInput(event.target.value)} >Mot de passe</p>
          <input type="password"/>
<button className="modal-button">Se connecter</button>          
<p className="text-secondaire" style={{textAlign: "center"}}>Vous n'avez pas de compte ?</p>
<button className="modal-button">Créer un compte</button>          

          </div>
        </div>
      )}
      <Header setShowModal={setShowModal} user={user}
        logOut={() => {
          Cookies.remove("user");
          setUser(null);
        }}
        logIn={obj => {
          // 1. Enregistrer le cookie
          // Pour la persistance des données
          Cookies.set("user", obj.name);

          // 2. Sauvegarder l'état `user`
          // Pour déclencher un rafraichisement
          setUser(obj);
        }} />
       
      <Switch>
        <Route path="/offer/:id">
          <Offer />
        </Route>
        <Route path="/">
          <Offers />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
