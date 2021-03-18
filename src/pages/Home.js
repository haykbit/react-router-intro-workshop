import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Main from "../components/Main";

function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getUsers() {
      try {
        setLoading(true);

        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );

        setError(null);
        setLoading(false);
        setUsers(response.data);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }

    if (users.length === 0) {
      getUsers();
    }
  }, [users]);

  return (
    <div>
      <Main>
        {loading && (
          <section className="row-cols-1 mt-3">
            <div className="col">
              <p>Loading users...</p>
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
        {users.length > 0 && (
          <section className="row mt-3">
            {users.map((user) => (
              <div key={user.id} className="col col-4">
                <div className="border p-2 mb-4">
                  <code className="d-block mb-1">@{user.username}</code>
                  <Link to={`/users/${user.id}`}>User details</Link>
                </div>
              </div>
            ))}
          </section>
        )}
      </Main>
    </div>
  );
}

export default Home;
