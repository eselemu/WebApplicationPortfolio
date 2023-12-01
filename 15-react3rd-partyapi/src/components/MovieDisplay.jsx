import React, { useContext, useState, useEffect } from "react";
import axios from 'axios';

import MovieContext from '../MovieContext';
import './ProminentCharacter.css'

import ProminentCharacter from "./ProminentCharacter";
import PostComment from "./PostComment";
import Comment from "./Comment"

function MovieDisplay(props) {
  const { movie } = useContext(MovieContext);
  const imagePath = `/images/${movie.poster}`;
  const [comments, setComments] = useState([]);

  const getComments = async () => {
    try {
      const response = await axios.post('/getComment', { episode: movie.episode });
      if (response.status === 200) {
        console.log(response.data);
        setComments(response.data);
      } else {
        console.error("Error while extracting posts from database: " + response.status);
      }
    } catch (err) {
      console.error("Error in axios call: " + err.message);
    }
  };

  useEffect(() => {
    getComments();
  }, []);

  function mapComments() {
    if (comments) {
      return comments.map((comment) => (
        <Comment comment={comment}/>
      ));
    }
    return undefined;
  }

  let renderedComments = mapComments();

  return (
    <div>
      <br></br>
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-6">
            <h1>Episode: {movie.episode}</h1>
            <h1>Title</h1>
            <h4>{movie.title}</h4>
            <h4>Year: {movie.year}</h4>
          </div>
          <div className="col-12 col-sm-6">
            <img src={imagePath} className="card-img-top posterImage" alt={movie.poster} />
          </div>
        </div>
        <br />
        <h2>Prominent Character</h2>
      </div>
      <br />
      <ProminentCharacter character={movie.best_character} />
      {renderedComments}
      <PostComment reloadComments={getComments}/>
    </div>
  );
}

export default MovieDisplay;