"use client"

import SearchIcon from "@/public/SearchIcon";
import { useMovieContext } from "@/contexts/MovieContext";
import { MovieContextType } from "@/types/types";

const Search = () => {
  const { searchTerm, setSearchTerm } = useMovieContext();
  return (
    <div className="search">
        <div className="search-wrapper">
            <SearchIcon/>

            <input type="text" 
                placeholder="Search Through thousands of movies"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}/>
        </div>
    </div>
  )
}

export default Search