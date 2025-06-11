import { Dispatch, SetStateAction } from "react"

export interface Movie {
    id: number,
    title: string,
    vote_average: number,
    poster_path: string,
    release_date: string,
    original_language: string
    poster_url: string
}

export type PaginationBtnType = {
    icon: string,
    onClick: () => void;
}

export type MovieContextType = {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    movieList: Movie[];
    isLoading: boolean,
    errorMessage: string,
    page: number,
    setPage: (page: number) => void;
    totalPages: number;
    trendingMovies: Movie[]
    getMovieById: (id: string) => Promise<Movie> 
}

export type ThemeContextType = {
    isDarkMode: boolean;
    toggleTheme: () => void;
}

export type TrendingMovies = {
    searchTerm: string;
    movie: {
        id: number,
        poster_path: string
    };
}