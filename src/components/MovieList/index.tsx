import Image from "next/image";
import styles from "./index.module.scss";
import { PiArrowFatRightDuotone as GoDetailIcon, PiX as NotFoundIcon } from "react-icons/pi";

type Props = {
  movies: Movie[];
  displayType: "grid" | "table";
};
type CardProps = {
  movie: Movie;
};

const GridCard: React.FC<CardProps> = ({ movie }) => {
  return (
    <div className={styles.card}>
      {movie.Poster === "N/A" ? (
        <div className={styles.poster}>
          <div className={styles.noPoster}>
            <NotFoundIcon className="w-16 h-16" />
            <p>Any poster available</p>
          </div>
        </div>
      ) : (
        <div className={styles.poster}>
          <Image src={movie.Poster} alt={movie.Title} layout="fill" objectFit="cover" />
        </div>
      )}
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

const TableCard: React.FC<CardProps> = ({ movie }) => {
  return (
    <tr className={styles.tableRow}>
      <td className={styles.tableCell}>
        {movie.Poster === "N/A" ? (
          <div className={styles.poster}>
            <div className={styles.noPoster}>
              <NotFoundIcon className="w-16 h-16" />
            </div>
          </div>
        ) : (
          <div className={styles.poster}>
            <Image src={movie.Poster} alt={movie.Title} layout="fill" objectFit="cover" />
          </div>
        )}
      </td>
      <td className={styles.tableCell}>{movie.Title}</td>
      <td className={styles.tableCell}>{movie.Year}</td>
      <td className={styles.tableCell}>{`#${movie.imdbID}`}</td>
    </tr>
  );
};

const MovieList: React.FC<Props> = ({ displayType, movies }) => {
  return displayType === "grid" ? (
    <ul className={styles.grid}>
      {movies.map((movie) => (
        <GridCard key={movie.imdbID} movie={movie} />
      ))}
    </ul>
  ) : (
    <table className={styles.table}>
      <thead className={styles.tableHead}>
        <tr>
          <th>Poster</th>
          <th>Title</th>
          <th>Year</th>
          <th>IMDB ID</th>
        </tr>
      </thead>
      <tbody>
        {movies.map((movie) => (
          <TableCard key={movie.imdbID} movie={movie} />
        ))}
      </tbody>
    </table>
  );
};

export default MovieList;
