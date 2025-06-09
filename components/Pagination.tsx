"use client"

import React from "react";
import PaginationBtn from "./PaginationBtn";
import { nextPage, previousPage } from "@/lib/utils";
import { useMovieContext } from "@/contexts/MovieContext";
import { useTheme } from "@/contexts/ThemeContext";

const Pagination = () => {
  const { page, setPage, totalPages } = useMovieContext();
  const { isDarkMode } = useTheme();

  return (
    <div className={` ${isDarkMode ? 'text-white' : 'text-dark-100'} pagination`}>
      <PaginationBtn
        icon="arrow_left.svg"
        onClick={() => setPage(previousPage(page))}
      />

      <span className="font-semibold">
        {page} / {totalPages}
      </span>

      <PaginationBtn
        icon="arrow_right.svg"
        onClick={() => setPage(nextPage(page, totalPages))}
      />
    </div>
  );
};

export default Pagination;
