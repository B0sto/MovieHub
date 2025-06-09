import { Dispatch, SetStateAction } from "react"

export interface Movie {
    id: number,
    title: string,
    vote_average: number,
    poster_path: string,
    release_date: string,
    original_language: string
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
}