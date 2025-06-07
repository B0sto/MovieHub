'use client'

import Search from "@/components/Search";
import Logo from "@/public/Logo";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDebounce } from "react-use";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState([]);
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
      <div>
        <Logo/>

        <div className="wrapper relative">
          <header>
            <img src="./heroimg.png" alt="heroimg" />

            <h1>Find <span className="text-gradient">Movies</span> You'll enjoy Without the Hassle</h1>

            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>

          </header>
        </div>

        {/* light / dark mode  */}
        <span className="text-2xl text-white absolute top-5 right-5">Sun</span>
      </div>
    </main>
  )
}
