import { useMovieContext } from "@/contexts/MovieContext"
import { useTheme } from "@/contexts/ThemeContext";
import Image from "next/image";

const TrendingMovies = () => {
    const { trendingMovies } = useMovieContext();
    const { isDarkMode } = useTheme();

  return (
    <>
        {trendingMovies.length > 0 && (
            <section className="trending">
                <h2 className={`${isDarkMode ? 'text-white' : 'text-black'}`}>Trending</h2>

                <ol>
                    {trendingMovies.map((movie, index) => (
                        <li key={index} className="flex gap-x-[10px] justify-center">
                            <p>{index + 1}</p>
                            <Image src={movie.poster_url} alt="trend-movie" width={300} height={300}/>
                        </li>
                    ))}
                </ol>
            </section>
        )} 
    </>
  )
}

export default TrendingMovies