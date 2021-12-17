import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import styled from "styled-components";

import Header from "./Header";
import BloomHeader from "./BloomHeader";
import Login from "./Login";
import Logout from "./Logout";
import View from "./View";
import PrivateRoute from "./PrivateRoute";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  // This is to force a render in the Header component so that the menu refreshes when user logs in or out
  const token = localStorage.getItem("token");

  // helper function for the loggedIn state
  function checkLocalStorage() {
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }
  useEffect(() => {
    checkLocalStorage(token);

    const handler = ({ token }) => checkLocalStorage(token);
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);
  // This checks for a token incase the page is refreshed, otherwise it would break the state for loggedIn
  return (
    <AppContainer>
      <BloomHeader />
      <Header loggedIn={loggedIn} />
      <RouteContainer>
        <Route exact path="/">
          <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        </Route>

        <Route exact path="/login">
          <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        </Route>
        <PrivateRoute exact path="/view" component={View} />
        <PrivateRoute
          exact
          path="/logout"
          component={Logout}
          setLoggedIn={setLoggedIn}
        />
      </RouteContainer>
    </AppContainer>
  );
};

export default App;

//Task List
//1. Create and import PrivateRoute component.
//2. Create a Route for Login pointing to '/login.'
//3. Create a PrivateRoute for View component point to '/view.'
//4. Create a PrivateRoute for Logout component pointing to '/logout.'

const AppContainer = styled.div`
  height: 100%;
`;
const RouteContainer = styled.div`
  display: flex;
  height: 85%;
  align-items: center;
  flex-direction: column;
`;
