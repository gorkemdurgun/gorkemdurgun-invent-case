import Image from "next/image";
import styles from "./index.module.scss";
import { PiArrowFatRightDuotone as GoDetailIcon, PiX as NotFoundIcon } from "react-icons/pi";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { useRouter } from "next/navigation";
import { services } from "@/services";
import MovieTableCard from "../MovieTableCard";
import MovieGridCard from "../MovieGridCard";

type Props = {
  displayType: DisplayType;
  onError?: () => void;
};
type CardProps = {
  movie: Movie;
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
        <MovieGridCard key={movie.imdbID} movie={movie} />
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
          <MovieTableCard key={movie.imdbID} movie={movie} />
        ))}
      </tbody>
    </table>
  );
};

export default MovieList;
