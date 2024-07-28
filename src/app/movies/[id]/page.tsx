"use client";

import { services } from "@/services";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import Image from "next/image";
import {
  PiClockDuotone as ClockIcon,
  PiCalendarDotsDuotone as CalendarIcon,
  PiFilmReelBold as CategoryIcon,
  PiPencilBold as WriterIcon,
  PiUserCircleBold as ActorIcon,
  PiTranslateBold as LanguageIcon,
} from "react-icons/pi";

const MovieIdPage = () => {
  const pathname = usePathname();
  const movieId = pathname.split("/")[2];

  const [movieDetail, setMovieDetail] = useState<MovieDetail | undefined>(undefined);

  function getMovie() {
    services.getMovieById(movieId).then((movieDetail) => {
      setMovieDetail(movieDetail);
    });
  }

  useEffect(() => {
    getMovie();
  }, [movieId]);

  const Divider = () => <div className={styles.divider} />;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.leftContainer}>
          <div className={styles.posterContainer}>
            {movieDetail?.Poster ? (
              <Image
                className={styles.poster}
                src={movieDetail?.Poster}
                alt={movieDetail?.Title || "Movie Poster"}
                layout="fill"
                objectFit="cover"
              />
            ) : (
              <div className={styles.noPoster}>No Poster</div>
            )}
          </div>
          <span className={styles.country}>{`Producer country: ${movieDetail?.Country}`}</span>
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.dates}>
            <div className={styles.duration}>
              <ClockIcon className={styles.durationIcon} />
              <span className={styles.durationText}>{movieDetail?.Runtime}</span>
            </div>
            <div className={styles.releaseDate}>
              <CalendarIcon className={styles.releaseDateIcon} />
              <span className={styles.releaseDateText}>{movieDetail?.Released}</span>
            </div>
          </div>
          <div className={styles.informations}>
            <h1 className={styles.title}>{movieDetail?.Title}</h1>
            <p className={styles.description}>{movieDetail?.Plot} </p>
          </div>
        </div>
        <div className={styles.rightContainer}>
          {movieDetail?.Genre !== "N/A" && (
            <>
              <div className={styles.list} data-type="categories">
                <h1 className={styles.title}>Categories</h1>
                <div className={styles.listItems}>
                  {movieDetail?.Genre?.split(", ").map((genre) => (
                    <span key={genre} className={styles.listItem}>
                      <CategoryIcon className={styles.icon} />
                      <span className={styles.text}>{genre}</span>
                    </span>
                  ))}
                </div>
              </div>
              <Divider />
            </>
          )}
          {movieDetail?.Director !== "N/A" && (
            <>
              <div className={styles.list} data-type="writers">
                <span className={styles.title}>Writers</span>
                <div className={styles.listItems}>
                  {movieDetail?.Writer?.split(", ").map((writer) => (
                    <span key={writer} className={styles.listItem}>
                      <WriterIcon className={styles.icon} />
                      <span className={styles.text}>{writer}</span>
                    </span>
                  ))}
                </div>
              </div>
              <Divider />
            </>
          )}
          {movieDetail?.Actors !== "N/A" && (
            <>
              <div className={styles.list} data-type="actors">
                <span className={styles.title}>Actors</span>
                <div className={styles.listItems}>
                  {movieDetail?.Actors?.split(", ").map((actor) => (
                    <span key={actor} className={styles.listItem}>
                      <ActorIcon className={styles.icon} />
                      <span className={styles.text}>{actor}</span>
                    </span>
                  ))}
                </div>
              </div>
              <Divider />
            </>
          )}
          {movieDetail?.Language !== "N/A" && (
            <>
              <div className={styles.list} data-type="languages">
                <span className={styles.title}>Languages</span>
                <div className={styles.listItems}>
                  {movieDetail?.Language?.split(", ").map((language) => (
                    <span key={language} className={styles.listItem}>
                      <LanguageIcon className={styles.icon} />
                      <span className={styles.text}>{language}</span>
                    </span>
                  ))}
                </div>
              </div>
              <Divider />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieIdPage;
