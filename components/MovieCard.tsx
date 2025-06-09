import Image from "next/image"
import Link from "next/link"
import StarIcon from "./StarIcon"
import { Movie } from "@/types/types"

const MovieCard = ({movie: {id, title, vote_average, poster_path, release_date, original_language}}: {movie: Movie}) => {
  return (
    <Link href={`/movie/${id}`} className="movie-card">
        <Image src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : '/noPoster.png'} alt={title} width={200} height={170}/>

        <div className="mt-4">
            <h3>{title}</h3>

            <div className="content">
                <div className="rating">
                    <StarIcon/>
                    <p>{vote_average ? vote_average.toFixed(1) : 'N / A'}</p>
                </div>

                <span>•</span>

                <p className="lang">{original_language}</p>

                <span>•</span>

                <p className="year">
                    {release_date ? release_date.split('-')[0] : "N/A"}
                </p>
            </div>
        </div>
    </Link>
  )
}

export default MovieCard