import { useEffect, useState } from "react";
import "./index.css";
import Navbar from "./components/Navbar";
import Main, { Box, MovieList } from "./components/Main";
import Logo from "./components/Logo";
import Search from "./components/Search";
import Results from "./components/Results";
import StartRating from "./components/StarRating";
import Loader from "../components/Loader";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];
const apiKey = "5ebf4b7";

const PopcornApp = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("interstellar");
  const [selectedMovieId, setSelectedMovieId] = useState(0);
  const [watched, setWatched] = useState([]);
  useEffect(() => {
    const controller = new AbortController();

    const getMovies = async () => {
      if (query.length < 3) {
        setMovies([]);
        setError(null);

        return;
      }
      try {
        setLoading(true);
        const res = await fetch(
          `https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`,
          {
            signal: controller.signal,
          }
        );
        const data = await res.json();
        if (data.Response == "False") {
          console.log(data);
          // setError(data.Error);
          throw new Error(data.Error);
        }
        if (data.Response == "True") {
          setError(null);
          if (data.Search.length == 0) {
            setError("No search results");
          }
          setMovies(data.Search);
          setLoading(false);
        }
        setError("");
        console.log(data);
      } catch (error) {
        setLoading(false);
        if (error.name !== "AbortError") {
          setError(error.message);
        }
        console.log(error);
      }
    };
    getMovies();

    return () => {
      controller.abort();
    };
  }, [query]);

  //debe moverse al componente donde se necesite el llamado
  useEffect(() => {
    const closeWithEscapeKey = (e) => {
      console.log(e);
      if (e.key == "Escape") {
        setSelectedMovieId(0);
      }
    };

    document.addEventListener("keydown", closeWithEscapeKey);

    return () => {
      document.removeEventListener("keydown", closeWithEscapeKey);
    };
  }, []);

  const closeSelectedMovie = () => {
    setSelectedMovieId(null);
  };
  const addWatchedMovie = (movie) => {
    setWatched((prevState) => [...prevState, movie]);
  };

  const handleDelete = (id) => {
    const movieArray = watched.filter((item) => item.imdbID !== id);
    setWatched(movieArray);
  };

  return (
    <>
      <Navbar>
        <Results movies={movies} />
        <Search setQuery={setQuery} query={query} />
      </Navbar>

      <Main
        selectedId={selectedMovieId}
        closeMovie={closeSelectedMovie}
        addWatchedMovie={addWatchedMovie}
        handleDelete={handleDelete}
        watched={watched}
      >
        <Box>
          {error && !loading && <ErrorMesage message={error} />}
          {loading ? (
            <Loader />
          ) : (
            // !error && (
            //   <MovieList
            //     movies={movies}
            //     setSelectedMovie={setSelectedMovieId}
            //   />
            // )

            <MovieList movies={movies} setSelectedMovie={setSelectedMovieId} />
          )}
        </Box>
      </Main>
      {/* <StartRating maxRating={10} /> */}
    </>
  );
};

const ErrorMesage = ({ message }) => {
  return <p className="error">{message}</p>;
};

export default PopcornApp;
