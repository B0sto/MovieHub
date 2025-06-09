"use client";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useDebounce } from "react-use";
import { Movie } from "@/types/types";
import { MovieContextType } from "@/types/types";

const MovieContext = createContext<MovieContextType | null>(null);

export const MovieProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useDebounce(
    () => {
      setDebouncedSearchTerm(searchTerm);
    },
    500,
    [searchTerm]
  );

  useEffect(() => {
    async function getMovies(query = "") {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const endpoint = query
          ? `/api/movies?query=${encodeURIComponent(query)}&page=${page}`
          : `/api/movies?page=${page}`;

        const response = await axios.get(endpoint);
        const result = response.data.results || [];

        if (result.length === 0) {
          setErrorMessage("No Movies Found");
          setMovieList([]);
          setTotalPages(1);
          return;
        }

        setMovieList(result);
        setTotalPages(response.data.total_pages || 1);
      } catch (error) {
        console.error("Error getting Movies", error);
        setErrorMessage("Something went wrong");
        setMovieList([]);
        setTotalPages(1);
      } finally {
        setIsLoading(false);
      }
    }

    getMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm, page]);

  return (
    <MovieContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        movieList,
        isLoading,
        errorMessage,
        page,
        setPage,
        totalPages,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => {
  const context = useContext(MovieContext);
  if (!context)
    throw new Error("useMovieContext must be used within a MovieProvider");
  return context;
};
