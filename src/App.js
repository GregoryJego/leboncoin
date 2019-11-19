import React, {useState} from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Offers from "./containers/Offers";
import Offer from "./containers/Offer";
import Signup from "./containers/Signup";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Cookie from "js-cookie";

import "./App.css";
import "./reset.css";

function App() {
  const token = Cookie.get("token");
  const [user, setUser] = useState({ token: token });

  const [isModalDisplayed, setIsModalDisplayed] = useState(false);

  return (
    <Router>
    {isModalDisplayed === true && (
        <div className="modal">
          <div
            className="modal-close"
            onClick={() => {
              setIsModalDisplayed(false);
            }}
          >
            x
          </div>
          <div >
            <Login
              setIsModalDisplayed={setIsModalDisplayed}
              setUser={setUser}
            />
          </div>
        </div>
      )}
      <Header
        setUser={setUser}
        user={user}
        setIsModalDisplayed={setIsModalDisplayed}
      />
      <Switch>
        <Route path="/offer/:id">
          <Offer />
        </Route>
        <Route path="/signup">
          <Signup setUser={setUser} user={user}/>
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
