"use client";

import { useMovieContext } from "@/contexts/MovieContext";
import MovieCard from "./MovieCard";
import Spinner from "./Spinner";
import Search from "./Search";
import Pagination from "./Pagination";
import { useTheme } from "@/contexts/ThemeContext";
import TrendingMovies from "./TrendingMovies";
import { useEffect, useRef } from "react";

const MovieList = () => {
  const { isDarkMode } = useTheme();

  const { movieList, isLoading, errorMessage, totalPages, page } =
    useMovieContext();

  const moviesSectionRef = useRef<HTMLElement>(null);
  const prevPageRef = useRef(page);

  useEffect(() => {
    if (prevPageRef.current !== page) {
      if (moviesSectionRef.current) {
        const top =
          moviesSectionRef.current.getBoundingClientRect().top + window.scrollY;

        window.scrollTo({
          top: top + 150,
          behavior: "smooth",
        });
      }
      prevPageRef.current = page;
    }
  }, [page])

  return (
    <>
      <section className="all-movies" ref={moviesSectionRef}>
        <Search />
        <TrendingMovies />

        <h2 className={`${isDarkMode ? "text-white" : "text-black"}`}>
          Popular
        </h2>
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
      {totalPages > 1 && <Pagination />}
    </>
  );
};

export default MovieList;
