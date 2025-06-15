import { useMovieContext } from "@/contexts/MovieContext";
import { useTheme } from "@/contexts/ThemeContext";
import Image from "next/image";
import Link from "next/link";
import { bebasNeue } from "@/fonts/fonts";

const TrendingMovies = () => {
  const { trendingMovies } = useMovieContext();
  const { isDarkMode } = useTheme();  

  return (
    <>
      {trendingMovies.length > 0 && (
        <section className="trending">
          <h2 className={`${isDarkMode ? "text-white" : "text-black"}`}>
            Trending
          </h2>

          <ol>
            {trendingMovies.map((movie, index) => (
              <li key={index} className="flex gap-x-[10px] justify-center">
                <p className={`${isDarkMode ? "fancy-text-dark" : "fancy-text-light"} ${bebasNeue.className} `}>
                  {index + 1}
                </p>
                <Link href={`/movie/${movie.movie_id}`}>
                  <Image
                    src={movie.poster_url}
                    alt={movie.title || "trend-movie"}
                    width={300}
                    height={300}
                    className="hover:scale-[1.05] transition duration-200"
                  />
                </Link>
              </li>
            ))}
          </ol>
        </section>
      )}
    </>
  );
};

export default TrendingMovies;
