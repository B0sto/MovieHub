"use client"

import React from "react";
import PaginationBtn from "./PaginationBtn";
import { nextPage, previousPage } from "@/lib/utils";
import { useMovieContext } from "@/contexts/MovieContext";

const Pagination = () => {
  const { page, setPage, totalPages } = useMovieContext();

  return (
    <div className="pagination">
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
