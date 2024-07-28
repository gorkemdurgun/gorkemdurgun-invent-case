"use client";

import React, { memo } from "react";
import { PiArrowFatRightDuotone as GoDetailIcon, PiX as NotFoundIcon } from "react-icons/pi";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./index.module.scss";

type CardProps = {
  movie: Movie;
};

const MovieGridCard: React.FC<CardProps> = ({ movie }) => {
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

export default memo(MovieGridCard);
