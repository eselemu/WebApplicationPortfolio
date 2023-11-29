import React, { useState } from 'react';

import './App.css';

import MovieContainer from './components/MovieContainer';
import ProminentCharacter from './components/ProminentCharacter';
import PostComment from './components/PostComment';
import Comment from './components/Comment';

function App() {
  const [character, setCharacter] = useState({
    name: "",
    affiliation: "",
    image: "",
    bio: "",
  });

  const [comments, setCommentsState] = useState(new Map());

  const addComment = (key, newComment) => {
    setCommentsState((prevComments) => {
      // Create a new Map for the updated state
      const updatedComments = new Map(prevComments);

      // Get the array of comments for the key, or an empty array if it doesn't exist
      const keyComments = updatedComments.get(key) || [];

      // Add the new comment
      keyComments.push(newComment);

      // Update the Map
      updatedComments.set(key, keyComments);

      return updatedComments;
    });
  };

  function mapComments() {
    if (comments.get(character.name)) {
      return comments.get(character.name).map((comment) => (
        <Comment comment={comment}/>
      ));
    }
    return undefined;
  }

  return (
    <div className="App">
      <MovieContainer setCharacter={setCharacter} />
      {character.name !== "" ? <ProminentCharacter character={character} /> : null}
      {character.name !== "" ? mapComments() : null}
      {character.name !== "" ? <PostComment addComment={addComment} name={character.name}/> : null}     
    </div>
  );
}

export default App;
