import React, { useState, useEffect } from "react";
import axios from 'axios';
import MoviePoster from "./MoviePoster";

function MovieContainer(props) {

  const [data, setData] = useState([]);

  const getSW = async () => {
    try {
      const response = await axios.post('/getSWData');
      if (response.status === 200) {
        setData(response.data);
        console.log(data);
      } else {
        console.error("Error while extracting posts from database: " + response.status);
      }
    } catch (err) {
      console.error("Error in axios call: " + err.message);
    }
  };

  useEffect(() => {
    getSW();
  }, []);

  function mapMovies() {
    if (data) {
      return data.map((movie) => (
        <MoviePoster
          movie = {movie}/>
      ));
    }
    return undefined;
  }

  let renderedMovies = mapMovies();
  return (
    <div className="container">
      <div className="row">
        {renderedMovies}
      </div>
    </div>
  );
}

export default MovieContainer;