"use client";

import React, { use, useEffect, useState } from "react";
import { useMovieContext } from "@/contexts/MovieContext";
import StarIcon from "@/components/StarIcon";
import Spinner from "@/components/Spinner";
import { Movie } from "@/types/types";

const page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const { getMovieById } = useMovieContext();
  const [movie, setMovie] = useState<Movie | undefined>(undefined);

  useEffect(() => {
    const fetchMovie = async () => {
      const resp = await getMovieById(id);
      setMovie(resp);
    };

    fetchMovie();
  }, [id]);

  if (!movie)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );

  return (
      <h1 className="">{movie.title}</h1>
  );
};

export default page;
