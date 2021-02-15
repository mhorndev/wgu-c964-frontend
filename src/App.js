import React, { useState, useEffect } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import 'fontsource-roboto';
import Auth from './Auth';
import Main from './Main';

export default function App() {
  let [authenticated, setAuthenticated] = useState(
    window.localStorage.getItem('c964user') !== null
  );

  let login = () => {
    window.localStorage.setItem('c964user',true); 
    setAuthenticated(true);
  }

  let logout = () => {
    window.localStorage.removeItem('c964user');
    setAuthenticated(false);
  }

  return (
    <Router>
      <Switch>
        <Route path="/login">
          {authenticated ? 
            <Redirect to={{pathname: "/app"}}/> 
          :
            <Auth login={() => login()}/>
          }
        </Route>

        <Route path="/app">
          {authenticated ? 
            <Main logout={() => logout()}/>
          : 
            <Redirect to={{pathname: "/login"}}/>
          }
        </Route>

        <Route path="/*">
          {authenticated ? 
            <Redirect to={{pathname: "/app"}}/> 
          : 
            <Redirect to={{pathname: "/login"}}/>
          }
        </Route>

      </Switch>
    </Router>
  );
}

