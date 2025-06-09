"use client"

import SearchIcon from "@/public/SearchIcon";
import { useMovieContext } from "@/contexts/MovieContext";
import { useTheme } from "@/contexts/ThemeContext";

const Search = () => {
  const { isDarkMode } = useTheme();

  const { searchTerm, setSearchTerm } = useMovieContext();
  return (
    <div className={`search ${isDarkMode ? 'bg-light-100/5' : 'bg-dark-100/5'}`}>
        <div className={`search-wrapper ${isDarkMode ? 'text-gray-200 placeholder-light-200' : 'text-dark-100 placeholder-dark-100'} `}>
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