/* use react states and hooks
use external API
LordIcon Integration
https://www.youtube.com/watch?v=b9eMGE7QtTk
KEY : 66aca767
async -> takes some time to fetch movies
*/

import './App.css';
import MovieCard from './MovieCard';
import SearchIcon from './search.svg'
import { useEffect, useState } from 'react';
import lottie from 'lottie-web';
import { defineElement } from 'lord-icon-element';

// define "lord-icon" custom element with default properties
defineElement(lottie.loadAnimation)

const API_URL = "https:/www.omdbapi.com?apikey=66aca767";

function App() {
  const [movies,setMovies] = useState([]);
  const [searchTerm,setSearchTerm] = useState("");

  const serachMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search)
  }
  useEffect(() => {
    serachMovies('friends')
  },[]);
  return (
    <div className="app">
      <lord-icon trigger="loop" src="https://cdn.lordicon.com/xhitaejr.json" style={{height : '100px',width: '100px'}}></lord-icon>
      <h1>MovieMania</h1>
      <div className='search'>
        <input
          placeholder='Search for movies or tv shows'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}></input>
          <img src={SearchIcon} alt='search' onClick={() => serachMovies(searchTerm)}></img>
      </div>
      {
        movies.length > 0 ? 
        (
          <div className='container'>
            {movies.map((movie) => (
              <MovieCard movie={movie}></MovieCard>
            ))}
          </div>
        ) : 
        (
          <div className='empty'>
            <h2>No movies found</h2>
          </div>
        )
      } 
    </div>
  );
}

export default App;
