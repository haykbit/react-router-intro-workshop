import React, { useState, useEffect } from "react";
import * as api from "../api";
import { Link } from "react-router-dom";

import Main from "../components/Main";
import MemesList from "../components/MemesList";

function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [memes, setMemes] = useState([]);

  function getMemes() {
    try {
      setLoading(true);

      api.getMemes().then((data) => {
        setMemes(data);
      });

      setError(null);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  useEffect(() => {
      if (memes.length === 0) {
      getMemes();
    }
  }, [memes]);

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
        {memes.length > 0 && (
          <section className="row mt-3">
            {memes.map((meme) => (
              <div key={meme.name} className="col col-4">
                <div className="border p-2 mb-4">
                  <code className="d-block mb-1">@{meme.dbName}</code>
                  <Link to={`/meme/${meme.name}`}>User details</Link>
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