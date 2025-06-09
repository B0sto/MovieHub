"use client";

import { useMovieContext } from "@/contexts/MovieContext";
import MovieCard from "./MovieCard";
import Spinner from "./Spinner";
import Search from "./Search";
import Pagination from "./Pagination";

const MovieList = () => {
  const {
    movieList,
    isLoading,
    errorMessage,
    totalPages,
  } = useMovieContext();

  return (
    <>
      <section className="all-movies">
        <Search />
        <h2>Popular</h2>
        {isLoading ? (
          <Spinner />
        ) : errorMessage ? (
          <p className="text-red-500">{errorMessage}</p>
        ) : movieList?.length > 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {movieList.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </ul>
        ) : (
          <p>No movies found</p>
        )}
      </section>
      {totalPages > 1 && (
         <Pagination/>
      )}
    </>
  );
};

export default MovieList;
