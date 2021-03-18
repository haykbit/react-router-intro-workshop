import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouteMatch } from "react-router-dom";

import Main from "../components/Main";

function UserTodos() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [todos, setTodos] = useState([]);

  const { url } = useRouteMatch();

  useEffect(() => {
    async function getUsers() {
      try {
        setLoading(true);

        const response = await axios.get(
          `https://jsonplaceholder.typicode.com${url}`
        );

        setError(null);
        setLoading(false);
        setTodos(response.data);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }

    if (todos.length === 0) {
      getUsers();
    }
  }, [todos, url]);

  return (
    <div>
      <Main>
        {loading && (
          <section className="row-cols-1 mt-3">
            <div className="col">
              <p>Loading user data...</p>
            </div>
          </section>
        )}
        {error && !loading && (
          <section className="row-cols-1 mt-3">
            <div className="col">
              <p className="mb-3">Something went wrong...</p>
              <code>{error}</code>
            </div>
          </section>
        )}
        {todos.length > 0 && (
          <section className="row-cols-1 mt-3">
            {todos.map((todo) => (
              <div className="col" key={todo.id}>
                <pre>
                  <code className="d-block mb-1">
                    {JSON.stringify(todo, null, 2)}
                  </code>
                </pre>
              </div>
            ))}
          </section>
        )}
      </Main>
    </div>
  );
}

export default UserTodos;
