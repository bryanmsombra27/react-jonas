import { useEffect, useState } from "react";
import StartRating from "./StarRating";

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];
const apiKey = "5ebf4b7";

const Main = ({
  children,
  selectedId,
  closeMovie,
  addWatchedMovie,
  handleDelete,
  watched,
}) => {
  // const [watched, setWatched] = useState([]);

  return (
    <>
      <main className="main">
        {children}
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              closeMovie={closeMovie}
              addWatchedMovie={addWatchedMovie}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                handleDelete={handleDelete}
              />
            </>
          )}
        </Box>
      </main>
    </>
  );
};

export const Box = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
};
export const MovieList = ({ movies, setSelectedMovie }) => {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <MovieListItem
          movie={movie}
          key={movie?.imdbID}
          setSelectedMovie={setSelectedMovie}
        />
      ))}
    </ul>
  );
};
const MovieListItem = ({ movie, setSelectedMovie }) => {
  return (
    <li
      onClick={() => setSelectedMovie(movie?.imdbID)}
      style={{
        cursor: "pointer",
      }}
    >
      <img src={movie?.Poster} alt={`${movie?.Title} poster`} />
      <h3>{movie?.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie?.Year}</span>
        </p>
      </div>
    </li>
  );
};
const MovieDetails = ({ selectedId, closeMovie, addWatchedMovie, watched }) => {
  const [movie, setMovie] = useState(null);
  const [userRating, setUserRating] = useState(0);
  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);

  useEffect(() => {
    const getMovieById = async () => {
      const res = await fetch(
        `https://www.omdbapi.com/?i=${selectedId}&apikey=${apiKey}`
      );
      const data = await res.json();
      setMovie(data);
    };

    getMovieById();
  }, [selectedId]);

  useEffect(() => {
    document.title = `Movie ${movie?.Title}`;

    return () => {
      document.title = "Popcorn";
    };
  }, [movie?.Title]);

  // const handleAdd = (movie) => {
  const handleAdd = () => {
    const watchedFound = watched.find((item) => item.imdbID == movie?.imdbID);

    if (watchedFound) {
      return;
    }
    const newMovie = {
      imdbID: movie?.imdbID,
      imdbRating: +movie?.imdbRating,
      Title: movie?.Title,
      Year: movie?.Year,
      Poster: movie?.Poster,
      // Runtime: +movie?.Runtime.split(" ").at(0),
      Runtime: +movie?.Runtime.split(" ")[0],
      userRating: +userRating,
    };
    closeMovie();
    addWatchedMovie(newMovie);
  };

  return (
    <div className="details">
      <header>
        <button className="btn-back" onClick={closeMovie}>
          &larr;
        </button>
        <img src={movie?.Poster} alt={movie?.Title} />
        <div className="details-overview">
          <h2>{movie?.Title}</h2>
          <p>
            {movie?.Released} &bull; {movie?.Runtime}{" "}
          </p>
          <p>{movie?.genre}</p>
          <p>
            <span>🌟</span> {movie?.imdbRating} rating
          </p>
        </div>
      </header>

      <section>
        <div className="rating">
          {!isWatched ? (
            <>
              <StartRating
                maxRating={10}
                size={24}
                ratingHandler={setUserRating}
              />
              <button className="btn-add" onClick={handleAdd}>
                Add to list
              </button>
            </>
          ) : (
            <p>You rated this movie already</p>
          )}
        </div>
        <p>
          <em>{movie?.Plot}</em>
        </p>
        <p>Staring {movie?.Actors}</p>
        <p>Directed by {movie?.Director}</p>
      </section>
    </div>
  );
};

const WatchedSummary = ({ watched }) => {
  const average = (arr) =>
    arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
  const avgImdbRating = average(watched.map((movie) => movie?.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie?.userRating));
  const avgRuntime = average(watched.map((movie) => movie?.Runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
};

const WatchedMoviesList = ({ watched, handleDelete }) => {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovieListItem
          movie={movie}
          key={movie?.imdbID}
          handleDelete={handleDelete}
        />
      ))}
    </ul>
  );
};
const WatchedMovieListItem = ({ movie, handleDelete }) => {
  return (
    <>
      <li>
        <img src={movie?.Poster} alt={`${movie?.Title} poster`} />
        <h3>{movie?.Title}</h3>
        <div>
          <p>
            <span>⭐️</span>
            <span>{movie?.imdbRating}</span>
          </p>
          <p>
            <span>🌟</span>
            <span>{movie?.userRating}</span>
          </p>
          <p>
            <span>⏳</span>
            <span>{movie?.Runtime} min</span>
          </p>

          <button
            className="btn-delete"
            onClick={() => handleDelete(movie.imdbID)}
          >
            X{" "}
          </button>
        </div>
      </li>
    </>
  );
};

export default Main;
