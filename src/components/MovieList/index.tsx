import Image from "next/image";
import styles from "./index.module.scss";
import { PiArrowFatRightDuotone as GoDetailIcon, PiX as NotFoundIcon } from "react-icons/pi";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { useRouter } from "next/navigation";
import { services } from "@/services";

type Props = {
  displayType: "grid" | "table";
  onError?: () => void;
};
type CardProps = {
  movie: Movie;
};

const GridCard: React.FC<CardProps> = ({ movie }) => {
  const router = useRouter();
  return (
    <div
      className={styles.card}
      onClick={() => {
        router.push(`/movies/${movie.imdbID}`);
      }}
    >
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

const MovieList: React.FC<Props> = ({ displayType, onError }) => {
  const { list, loading, error } = useAppSelector((state) => state.movies);

  function handleTryAgain() {
    onError && onError();
  }

  if (loading) {
    return <p className="text-center text-white">Loading...</p>;
  }

  if (error) {
    return (
      <button className="w-full p-2 text-center text-xl text-red-700 bg-red-300 rounded-md" onClick={handleTryAgain}>
        Any result found, try again with clear filters
      </button>
    );
  }

  return displayType === "grid" ? (
    <ul className={styles.grid}>
      {list?.map((movie) => (
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
        {list?.map((movie) => (
          <TableCard key={movie.imdbID} movie={movie} />
        ))}
      </tbody>
    </table>
  );
};

export default MovieList;
