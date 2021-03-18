import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Main from "../components/Main";

function UserDetails({ match, history, location }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function getUsers() {
      try {
        setLoading(true);

        const { userId } = match.params;

        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${userId}`
        );

        setError(null);
        setLoading(false);
        setUserData(response.data);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }

    if (!userData) {
      getUsers();
    }
  }, [userData, match.params]);

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
        {userData && (
          <section className="row-cols-1 mt-3">
            <div className="col">
              <h1 className="h4">User: {userData.name}</h1>
              <hr />
            </div>
            <div className="col">
              <Link to={`${match.url}/todos`}>User todos</Link>
              <hr />
            </div>
            <div className="col">
              <pre>
                <code className="d-block mb-1">
                  {JSON.stringify(userData, null, 2)}
                </code>
              </pre>
            </div>
          </section>
        )}
      </Main>
    </div>
  );
}

export default UserDetails;
