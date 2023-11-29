import React from "react";
import MoviePoster from "./MoviePoster";
import data from "../data"

function MovieContainer(props) {
  function mapMovies() {
    if (data) {
      return data.map((movie) => (
        <MoviePoster
          poster={movie.poster}
          title={movie.title}
          year={movie.year}
          bestCharacter={movie.best_character} 
          setCharacter={props.setCharacter}/>
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