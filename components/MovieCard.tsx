import Image from "next/image";
import Link from "next/link";
import StarIcon from "./StarIcon";
import { Movie } from "@/types/types";
import { useTheme } from "@/contexts/ThemeContext";

const MovieCard = ({
  movie: {
    id,
    title,
    vote_average,
    poster_path,
    release_date,
    original_language,
  },
}: {
  movie: Movie;
}) => {
  const { isDarkMode } = useTheme();

  return (
    <Link
      href={`/movie/${id}`}
      className={`movie-card ${
        isDarkMode
          ? "bg-dark-100 hover:bg-[#282357]"
          : "bg-gray-200 hover:bg-gray-400"
      }`}
    >
      <Image
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500/${poster_path}`
            : "/noPoster.png"
        }
        alt={title}
        width={200}
        height={170}
      />

      <div className="mt-4">
        <h3 className={`${isDarkMode ? 'text-white' : 'text-black'}`}>{title}</h3>

        <div className={`${isDarkMode ? 'text-gray-100' : 'text-gray-500'} content`}>
          <div className="rating">
            <StarIcon />
            <p className={` ${isDarkMode ? 'text-white' : 'text-shadow-dark-100'}`}>{vote_average ? vote_average.toFixed(1) : "N / A"}</p>
          </div>

          <span>•</span>

          <p className="lang">{original_language}</p>

          <span>•</span>

          <p className="year">
            {release_date ? release_date.split("-")[0] : "N/A"}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
