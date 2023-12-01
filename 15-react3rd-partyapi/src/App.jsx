import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'

import './App.css';

import MovieContainer from './components/MovieContainer';
import MovieDisplay from './components/MovieDisplay';
import MovieContext from './MovieContext';


function App() {

  const [movie, setMovie] = useState({
    episode: "",
    title: "",
    year: 0,
    poster: "",
    best_character: {
      name: "",
      affiliation: "",
      image: "",
      bio: "",
    }
  });

  return (
    <MovieContext.Provider value={{ movie, setMovie }}>
      <div className="App">
        <Routes>
          <Route path="/" element={<MovieContainer />} />
          <Route path="/movie" element={<MovieDisplay />} />
        </Routes>
      </div>
    </MovieContext.Provider>
  );
}

export default App;
