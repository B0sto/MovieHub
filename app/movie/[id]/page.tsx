"use client";

import React, { use, useEffect, useState } from "react";
import { useMovieContext } from "@/contexts/MovieContext";
import Spinner from "@/components/Spinner";
import { Movie } from "@/types/types";
import { formatReleaseDate, movieDurationConverter } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";
import ThemeToggle from "@/components/ThemeToggle";
import Logo from "@/public/Logo";
import Link from "next/link";
import ScoreBox from "@/components/ScoreBox";
import DetailRow from "@/components/DetailRow";
import GenreBadge from "@/components/GenreBadge";
import BugReportForm from "@/components/BugReportForm";
import FormModal from "@/components/FormModal";

const page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const { getMovieById } = useMovieContext();
  const { isDarkMode } = useTheme();
  const [movie, setMovie] = useState<Movie | undefined>(undefined);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      const resp = await getMovieById(id);

      setMovie(resp);
    };

    fetchMovie();
  }, [id]);

  useEffect(() => {
    if (isDarkMode !== undefined) {
      document.documentElement.classList.add(isDarkMode ? "dark" : "light");
      document.documentElement.classList.remove(isDarkMode ? "light" : "dark");
    }
  }, [isDarkMode]);
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
      } movies_detail_page relative`}
    >
      <Logo />
      <ThemeToggle />

      <div
        className={`movie_details ${
          isDarkMode ? " movie_details_dark" : "movie_details_light"
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div className="space-y-2">
            <h2
              className={`text-3xl md:text-4xl font-bold ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              {movie.title}
            </h2>
            <div
              className={`flex flex-wrap items-center gap-x-3 text-sm sm:text-base ${
                isDarkMode ? "text-[#A8B5DB]" : "text-gray-700"
              }`}
            >
              <p>{movie.release_date?.split("-")[0] || "Unknown"}</p>
              <span>•</span>
              <p>{movieDurationConverter(movie.runtime!)}</p>
            </div>
          </div>

          <ScoreBox
            voteAverage={movie.vote_average}
            voteCount={movie.vote_count ?? 0}
            isDarkMode={isDarkMode}
          />
        </div>

        <div className="poster_trailer flex flex-col md:flex-row gap-6 w-full">
          {movie.poster_path && (
            <div className="w-full md:w-1/3 aspect-[2/3]">
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt="poster"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          )}

          {movie.trailer_url && (
            <div className="w-full md:w-2/3 aspect-video">
              <iframe
                className="w-full h-full rounded-xl outline-none"
                src={movie.trailer_url.replace("watch?v=", "embed/")}
                title={movie.title + " Trailer"}
                allowFullScreen
              />
            </div>
          )}
        </div>

        {movie.genres!.length > 0 && (
          <DetailRow label="Genre" isDarkMode={isDarkMode}>
            <div className="flex flex-wrap gap-3">
              {movie.genres!.map((genre) => (
                <GenreBadge
                  key={genre.id}
                  genre={genre.name}
                  isDarkMode={isDarkMode}
                />
              ))}
            </div>
          </DetailRow>
        )}

        {movie.overview && (
          <DetailRow label="Overview" isDarkMode={isDarkMode}>
            <p className="leading-relaxed max-w-[560px]">{movie.overview}</p>
          </DetailRow>
        )}

        {movie.release_date && (
          <DetailRow label="Release Date" isDarkMode={isDarkMode}>
            <p>{formatReleaseDate(movie.release_date)}</p>
          </DetailRow>
        )}

        {movie.production_countries!.length > 0 && (
          <DetailRow label="Countries" isDarkMode={isDarkMode}>
            <ul className="flex flex-wrap gap-3">
              {movie.production_countries!.map((country, i) => (
                <li key={i} className="flex items-center">
                  {country.name}
                  {i < movie.production_countries!.length - 1 && (
                    <span
                      className={`mx-2 ${
                        isDarkMode ? "text-gray-500" : "text-gray-400"
                      }`}
                    >
                      •
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </DetailRow>
        )}

        {movie.status && (
          <DetailRow label="Status" isDarkMode={isDarkMode}>
            <p>{movie.status}</p>
          </DetailRow>
        )}

        {movie.spoken_languages!.length > 0 && (
          <DetailRow label="Language" isDarkMode={isDarkMode}>
            {movie
              .spoken_languages!.map((lang) => lang.english_name)
              .join(" • ")}
          </DetailRow>
        )}

        <DetailRow label="Budget" isDarkMode={isDarkMode}>
          {movie.budget ? `$${movie.budget.toLocaleString()}` : "Unknown"}
        </DetailRow>

        <DetailRow label="Revenue" isDarkMode={isDarkMode}>
          {movie.revenue ? `$${movie.revenue.toLocaleString()}` : "Unknown"}
        </DetailRow>

        {movie.tagline && (
          <DetailRow label="Tagline" isDarkMode={isDarkMode}>
            <p className="italic">"{movie.tagline}"</p>
          </DetailRow>
        )}

        {movie.production_companies!.length > 0 && (
          <DetailRow label="Production" isDarkMode={isDarkMode}>
            {movie.production_companies!.map((comp) => comp.name).join(" • ")}
          </DetailRow>
        )}

        <div className="flex justify-between flex-col sm:flex-row gap-4 pt-4">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-2.5 rounded-lg font-medium text-black text-center"
            style={{
              background: "linear-gradient(90deg, #D6C7FF 0%, #AB8BFF 100%)",
            }}
          >
            Return Back
          </Link>

          {movie.homepage && (
            <a
              href={movie.homepage}
              target="_blank"
              rel="noopener noreferrer"
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

      {openModal && <BugReportForm onClose={() => setOpenModal(false)} />}
      {!openModal && <FormModal onClick={() => setOpenModal(true)} />}
    </section>
  );
};

export default page;
