import Image from "next/image";
import styles from "./index.module.scss";
import { PiArrowFatRightDuotone as GoDetailIcon } from "react-icons/pi";

type Props = {
  movies: Movie[];
};
type MovieCardProps = {
  movie: Movie;
};

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className={styles.card}>
      <Image src={movie.Poster} alt={movie.Title} width={280} height={420} />
      <div className={styles.info}>
        <h3 className="text-xl">{movie.Title}</h3>
        <div className={styles.metaList}>
          <div className={styles.metaItem}>
            <span className="text-xs font-bold">Year</span> {movie.Year}
          </div>
          <div className={styles.metaItem}>
            <span className="text-xs font-bold">IMDB ID</span> #{movie.imdbID}
          </div>
        </div>
      </div>
      <div className={styles.overlay}>
        <GoDetailIcon className="w-16 h-16" />
      </div>
    </div>
  );
};

const MovieList: React.FC<Props> = ({ movies }) => {
  return (
    <ul className={styles.grid}>
      {movies.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} />
      ))}
    </ul>
  );
};

export default MovieList;
