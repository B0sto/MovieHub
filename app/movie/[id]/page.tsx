"use client";

import React, { use, useEffect, useState } from "react";
import { useMovieContext } from "@/contexts/MovieContext";
import StarIcon from "@/components/StarIcon";
import Spinner from "@/components/Spinner";
import { Movie } from "@/types/types";
import { formatVoteAverage, movieDurationConverter } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";
import ThemeToggle from "@/components/ThemeToggle";
import Logo from "@/public/Logo";

const page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const { getMovieById } = useMovieContext();
  const { isDarkMode } = useTheme();
  const [movie, setMovie] = useState<Movie | undefined>(undefined);

  useEffect(() => {
    const fetchMovie = async () => {
      const resp = await getMovieById(id);

      setMovie(resp);
    };

    fetchMovie();
  }, [id]);
  if (!movie) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <section
      className={`${
        isDarkMode ? "bg-primary" : "bg-white"
      } min-h-screen w-full pb-8 px-4 sm:px-6 md:px-10`}
    >
      <Logo />
      <ThemeToggle />

      <div className="movie_details max-w-7xl mx-auto bg-[#15162b] rounded-2xl shadow-xl overflow-hidden px-6 sm:px-10 py-10 space-y-10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              {movie.title}
            </h2>
            <div className="flex flex-wrap items-center gap-x-3 text-[#A8B5DB] text-sm sm:text-base">
              <p>{movie.release_date?.split("-")[0] || "Unknown"}</p>
              <span>•</span>
              <p>{movieDurationConverter(movie.runtime!)}</p>
            </div>
          </div>

          <div className="flex items-center gap-x-2 bg-[#221F3D] rounded-md px-4 py-2 h-fit w-fit self-start">
            <StarIcon />
            <p className="text-white text-sm sm:text-base font-medium">
              {formatVoteAverage(movie.vote_average)}/10
              <span className="text-[#A8B5DB]">
                {" "}
                ({Math.floor(movie.vote_count!)}K)
              </span>
            </p>
          </div>
        </div>

        {movie.backdrop_path && (
          <div className="w-full overflow-hidden rounded-xl">
            <img
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.title}
              className="w-full rounded-xl"
            />
          </div>
        )}

        {movie.genres && (
          <div className="grid sm:grid-cols-[150px_1fr] gap-4 items-start">
            <p className="font-semibold text-lg text-gray-300">Genres</p>
            <div className="flex flex-wrap gap-3">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="text-white text-sm font-semibold px-4 py-2 bg-[#221F3D] rounded-full"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
        )}
      {/* Header */}

        {movie.overview && (
          <div className="desc flex flex-col md:flex-row gap-2 md:gap-x-8 items-start">
            <p className="font-semibold w-[150px] shrink-0 text-gray-300">
              Overview
            </p>
            <p className="text-white leading-relaxed text-[17px] max-w-[80ch]">
              {movie.overview}
            </p>
          </div>
        )}

        {movie.release_date && (
          <div className="grid sm:grid-cols-[150px_1fr] gap-4 items-start">
            <p className="font-semibold text-lg text-gray-300">Release Date</p>
            <p className="text-white">{movie.release_date}</p>
          </div>
        )}

        {movie.production_countries!.length > 0 && (
          <div className="grid sm:grid-cols-[150px_1fr] gap-4 items-start">
            <p className="font-semibold text-lg text-gray-300">Countries</p>
            <ul className="flex flex-wrap gap-3 text-white">
              {movie.production_countries!.map((country, index) => (
                <li key={index} className="flex items-center">
                  {country.name}
                  {index < movie.production_countries!.length - 1 && (
                    <span className="mx-2 text-gray-500">•</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {movie.status && (
          <div className="grid sm:grid-cols-[150px_1fr] gap-4 items-start">
            <p className="font-semibold text-lg text-gray-300">Status</p>
            <p className="text-white">{movie.status}</p>
          </div>
        )}

        {movie.spoken_languages?.length! > 0 && (
          <div className="grid sm:grid-cols-[150px_1fr] gap-4 items-start">
            <p className="font-semibold text-lg text-gray-300">Language</p>
            <p className="text-white">
              {movie.spoken_languages!
                .map((lang) => lang.english_name)
                .join(" • ")}
            </p>
          </div>
        )}

        {movie.budget && (
          <div className="grid sm:grid-cols-[150px_1fr] gap-4 items-start">
            <p className="font-semibold text-lg text-gray-300">Budget</p>
            <p className="text-white">${movie.budget.toLocaleString()}</p>
          </div>
        )}

        {movie.revenue && (
          <div className="grid sm:grid-cols-[150px_1fr] gap-4 items-start">
            <p className="font-semibold text-lg text-gray-300">Revenue</p>
            <p className="text-white">${movie.revenue.toLocaleString()}</p>
          </div>
        )}

        {movie.tagline && (
          <div className="grid sm:grid-cols-[150px_1fr] gap-4 items-start">
            <p className="font-semibold text-lg text-gray-300">Tagline</p>
            <p className="text-white italic">"{movie.tagline}"</p>
          </div>
        )}

        {movie.production_companies!.length > 0 && (
          <div className="grid sm:grid-cols-[150px_1fr] gap-4 items-start">
            <p className="font-semibold text-lg text-gray-300">Production</p>
            <p className="text-white">
              {movie.production_companies?.map(comp => comp.name).join(" • ")}
            </p>
          </div>
        )}

        <div className="flex justify-between flex-col sm:flex-row gap-4 pt-4">
          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto px-6 py-2.5 rounded-lg font-medium text-black"
            style={{
              background: "linear-gradient(90deg, #D6C7FF 0%, #AB8BFF 100%)",
            }}
          >
            Return Back
          </button>

          {movie.homepage && (
            <a
              href={movie.homepage}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-6 py-2.5 rounded-lg font-medium text-black text-center"
              style={{
                background: "linear-gradient(90deg, #D6C7FF 0%, #AB8BFF 100%)",
              }}
            >
              Visit Homepage
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default page;
