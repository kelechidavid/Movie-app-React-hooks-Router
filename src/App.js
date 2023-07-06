import React, { useState } from "react";
import "./App.css";

// MovieCard component
const MovieCard = ({ movie, handleClick }) => {
  return (
    <div className="movie-card" onClick={() => handleClick(movie)}>
      <img src={movie.posterURL} alt={movie.title} />
      <h2>{movie.title}</h2>
      <p>{movie.description}</p>
      <span>
        <h5>Rating: {movie.rating}</h5>
      </span>
    </div>
  );
};

// MovieList component
const MovieList = ({ movies, handleClick }) => {
  return (
    <div className="movie-list">
      {movies.map((movie, index) => (
        <MovieCard key={index} movie={movie} handleClick={handleClick} />
      ))}
    </div>
  );
};

// MovieDetails component

const MovieDetails = ({ movie, handleBack }) => {
  return (
    <div className="movie-details">
      <h2>{movie.title}</h2>
      <p>{movie.description}</p>
      <iframe
        title="trailer"
        width="560"
        height="315"
        src={movie.trailerLink}
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
      <br></br>
      <button onClick={handleBack}>Back to Home</button>
    </div>
  );
};

// Filter component
const Filter = ({ handleFilterChange }) => {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    handleFilterChange({ title: e.target.value, rating });
  };

  const handleRatingChange = (e) => {
    setRating(e.target.value);
    handleFilterChange({ title, rating: e.target.value });
  };

  return (
    <div className="filter">
      <input
        type="text"
        placeholder="Search by title"
        value={title}
        onChange={handleTitleChange}
      />
      <input
        type="text"
        placeholder="Filter by rating"
        value={rating}
        onChange={handleRatingChange}
      />
    </div>
  );
};

// App component
const App = () => {
  const [movies, setMovies] = useState([
    {
      title: "65",
      description: "65 million years ago prehistoric Earth had a visitor",
      posterURL:
        "https://amc-theatres-res.cloudinary.com/v1679573486/amc-cdn/production/2/movies/66700/66661/Poster/Primary_BoxCover_HD_800_1200.jpg",
      rating: 4.5,
      trailerLink: "https://www.youtube.com/embed/bHXejJq5vr0",
    },
    {
      title: "John Wick 4",
      description: "John Wick uncovers a path to defeating The High Table.",
      posterURL:
        "https://www.themoviedb.org/t/p/w220_and_h330_face/vppo7eOOkkjoSoBSglYIxLDB0dJ.jpg",
      rating: 4.8,
      trailerLink: "https://www.youtube.com/embed/yjRHZEUamCc",
    },
    {
      title: "Fast X",
      description: "The end of the road begins.",
      posterURL:
        "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/fiVW06jE7z9YnO4trhaMEdclSiC.jpg",
      rating: 4.6,
      trailerLink: "https://www.youtube.com/embed/eoOaKN4qCKw",
    },

    {
      title: "Extraction 2",
      description:
        "Tasked with extracting a family who is at the mercy of a Georgian gangster.",
      posterURL:
        "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/7gKI9hpEMcZUQpNgKrkDzJpbnNS.jpg",
      rating: 4.7,
      trailerLink: "https://www.youtube.com/embed/Y274jZs5s7s",
    },
  ]);

  const [filteredMovies, setFilteredMovies] = useState(movies);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleFilterChange = ({ title, rating }) => {
    const filtered = movies.filter((movie) => {
      return (
        movie.title.toLowerCase().includes(title.toLowerCase()) &&
        movie.rating >= parseFloat(rating)
      );
    });
    setFilteredMovies(filtered);
  };

  const addMovie = (movie) => {
    setMovies([...movies, movie]);
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleBackToHome = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="app">
      <h1>Movie App</h1>
      {selectedMovie ? (
        <MovieDetails movie={selectedMovie} handleBack={handleBackToHome} />
      ) : (
        <>
          <Filter handleFilterChange={handleFilterChange} />
          <MovieList movies={filteredMovies} handleClick={handleMovieClick} />
          {/* Form to add a new movie */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const newMovie = {
                title: e.target.title.value,
                description: e.target.description.value,
                posterURL: e.target.posterURL.value,
                rating: parseFloat(e.target.rating.value),
                trailerLink: e.target.trailerLink.value,
              };
              addMovie(newMovie);
              e.target.reset();
            }}
          >
            <input type="text" name="title" placeholder="Title" required />
            <input
              type="text"
              name="description"
              placeholder="Description"
              required
            />
            <input
              type="text"
              name="posterURL"
              placeholder="Poster URL"
              required
            />
            <input type="number" name="rating" placeholder="Rating" required />
            <input
              type="text"
              name="trailerLink"
              placeholder="Trailer Embed Link"
              required
            />
            <button type="submit">Add Movie</button>
          </form>
        </>
      )}
    </div>
  );
};

export default App;
