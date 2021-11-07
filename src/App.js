//import logo from './logo.svg';
import './App.css';
//import React from "react";
import React, {useEffect, useState} from 'react';

function App() {
  const [movie, setMovie] = useState({});
  const [search, setSearch] = useState('');
  
  const API_KEY = "<--Your API key here -->";
  const url = `http://www.omdbapi.com/?t=${search}&apikey=${API_KEY}`;

  const getMovie = async()=>{
    try {
      const response = await fetch(url);
       const data = await response.json()
       setMovie(data);
    } catch (error) {
        console.error(error);
    } 
  }

  const onInputChange = e =>{
    setSearch(e.target.value);
  }

  useEffect(()=> {
    getMovie();
  }, []);


function checkResponse(data){
   if(data.Response==="True"){
     return(
       <div>
          <img src={data.Poster} alt=""/>
          <h4>Title: {data.Title}</h4>
          <p>Year: {data.Year}</p>
          <p>Writer: {data.Writer}</p>
          <p>{data.Response}</p>
       </div>
     );
  }
    return (
      <p>No Movie found</p>
    );
  }
  return (
    <div className="App">
      <input type="text" value={search} onChange={onInputChange}/>
         <button type="submit" onClick={getMovie}>Search</button>
         <br></br>   
         {checkResponse(movie)}      
    </div>
  );
}

export default App;
