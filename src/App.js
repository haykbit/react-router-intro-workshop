import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router";

import Home from "./pages/Home.js";
import About from "./pages/About";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import UserDetails from "./pages/UserDetails";
import UserTodos from "./pages/UserTodos";

import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";

function useLocalStorage(deps) {
  useEffect(() => {
    localStorage.setItem("authState", JSON.stringify(deps));
  }, [deps]);
}

function loadAuthState() {
  const authState = localStorage.getItem("authState");

  if (authState === null) {
    return {
      isAuthenticated: false,
    };
  }

  return JSON.parse(authState);
}

function App() {
  const [authState, setAuthState] = useState(() => loadAuthState());

  const { isAuthenticated } = authState;

  useLocalStorage(authState);

  function login() {
    setAuthState({
      isAuthenticated: true,
    });
  }

  function logout() {
    setAuthState({
      isAuthenticated: false,
    });
  }

  return (
    <div>
      <Header isAuthenticated={isAuthenticated} login={login} logout={logout} />
      <Switch>
        <Route path="/profile" component={Profile} />
        <Route path="/about" component={About} />
        <ProtectedRoute
          isAuthenticated={isAuthenticated}
          path="/users/:userId/todos"
          component={UserTodos}
        />
        <Route path="/users/:userId/todos" component={UserTodos} />
        <Route path="/users/:userId" component={UserDetails} />
        <Route exact path="/" component={Home} />
        <Route path="*" component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;