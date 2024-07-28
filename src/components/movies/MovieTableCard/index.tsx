"use client";

import React, { memo } from "react";
import { PiArrowFatRightDuotone as GoDetailIcon, PiX as NotFoundIcon } from "react-icons/pi";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./index.module.scss";

type CardProps = {
  movie: Movie;
};

const TableCard: React.FC<CardProps> = ({ movie }) => {
  const router = useRouter();
  return (
    <tr
      className={styles.tableRow}
      onClick={() => {
        router.push(`/movies/${movie.imdbID}`);
      }}
    >
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

export default memo(TableCard);
