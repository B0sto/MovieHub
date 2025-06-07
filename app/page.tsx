"use client";

import MovieCard from "@/components/MovieCard";
import Search from "@/components/Search";
import Spinner from "@/components/Spinner";
import Logo from "@/public/Logo";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDebounce } from "react-use";
import { Movie } from "@/types/types";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  const getMovies = async (query = "") => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const endpoint = query
        ? `api/movies?query=${encodeURIComponent(query)}`
        : `/api/movies`;

      const response = await axios.get(endpoint);
      const result = response.data.results || [];

      if (result.length === 0) {
        setErrorMessage("No movies found");
        setMovieList([]);
        return;
      }

      setMovieList(result);
    } catch (error) {
      console.error("Error getting movies", error);
      setErrorMessage("Something went wrong while getting data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <main>
      <div className="relative">
        <Logo />

        <span className="text-2xl text-white absolute top-5 right-5">Sun</span>
        <div className="wrapper">
          <header className="relative">
            <img src="./heroimg.png" alt="heroimg" />

            <h1>
              Find <span className="text-gradient">Movies</span> You'll enjoy
              Without the Hassle
            </h1>

            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </header>


          <section className="all-movies">
            <h2>Popular</h2>

            {isLoading ? (
              <Spinner />
            ) : errorMessage ? (
              <p className="text-red-500">{errorMessage}</p>
            ) : (
              <ul>
                {movieList.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
