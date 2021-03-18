import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router";

import Home from "./pages/Home";
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
        {/* If the current URL is /about or /profile, 
            this route is rendered while the rest are ignored */}
        <Route path="/profile" component={Profile} />
        <Route path="/about" component={About} />
        {/* If none of the previous routes render anything,
            this route acts as a fallback.

            Important: A route with path="/" will *always* match
            the URL because all URLs begin with a /. So that's
            why we put this one last of all */}
        <ProtectedRoute
          isAuthenticated={isAuthenticated}
          path="/users/:userId/todos"
          component={UserTodos}
        />
        <Route path="/users/:userId" component={UserDetails} />
        <Route exact path="/" component={Home} />
        <Route path="*" component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
