import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import MovieList from "./components/MovieList";
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox";
import AddFavourite from "./components/AddFavourite";
import RemoveFavourite from "./components/RemoveFavourite";

const App = () => {
  const [movies, setMovies] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [favourites, setFavourites] = React.useState([]);

const getMovieRequest = async(searchValue) => {
  const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=6937491e`;
  
  const response = await fetch(url);
  const responseJson = await response.json();

  if(responseJson.Search)
    setMovies(responseJson.Search)
}


React.useEffect(() => {
  getMovieRequest(searchValue);
}, [searchValue])


React.useEffect(() => {
  const movieFavourites = JSON.parse(
      localStorage.getItem('react-movie-app-favourites')
  );

  setFavourites(movieFavourites);
}, []);

const saveToLocalStorage = (items) => {
  localStorage.setItem('react-movie-app-favourites', JSON.stringify(items))
};

const addFavouriteMovie = (movie) => {
  const newFavouriteList = [...favourites, movie];
  setFavourites(newFavouriteList)

  saveToLocalStorage(newFavouriteList)
}

const removeFavouriteMovie = (movie) => {
  const newFavouriteList = favourites.filter((favourite) => favourite.imdbID !== movie.imdbID)

  setFavourites(newFavouriteList)
  saveToLocalStorage(newFavouriteList)
}


  return (
    <div className="container-fluid movie-app">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading='Movies'/>
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
      </div>
      <div className='row'>
        <MovieList 
          movies={movies} 
          favouriteComponent={AddFavourite}
          handleFavouritesClick={addFavouriteMovie}
        />
      </div>  
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading='Favourites'/>
      </div>
      <div className='row'>
        <MovieList 
          movies={favourites} 
          favouriteComponent={RemoveFavourite}
          handleFavouritesClick={removeFavouriteMovie}
        />
      </div> 
    </div>
  )
}

export default App;