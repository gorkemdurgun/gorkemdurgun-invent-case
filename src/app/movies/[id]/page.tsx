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
  PiFilmSlateBold as DirectorIcon,
  PiPencilBold as WriterIcon,
  PiUserCircleBold as ActorIcon,
  PiTranslateBold as LanguageIcon,
  PiFlagBold as CountryIcon,
  PiStar as StarIcon,
  PiStarHalfFill as StarHalfIcon,
  PiStarFill as StarFillIcon,
} from "react-icons/pi";
import { timeAgo } from "@/utils/moment";
import Skeleton from "@/components/Skeleton";

const MovieIdPage = () => {
  const pathname = usePathname();
  const movieId = pathname.split("/")[2];

  const [loading, setLoading] = useState(true);
  const [movieDetail, setMovieDetail] = useState<MovieDetail | undefined>(undefined);

  function getMovie() {
    setLoading(true);
    services
      .getMovieById(movieId)
      .then((movieDetail) => {
        setMovieDetail(movieDetail);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    getMovie();
  }, [movieId]);

  const Divider = () => <div className={styles.divider} />;

  function calculateRating(rating: string) {
    const ratingValue = parseFloat(rating);
    const stars = [];
    for (let i = 1; i <= 10; i++) {
      if (ratingValue >= i) {
        stars.push(<StarFillIcon key={i} className={styles.star} />);
      } else if (ratingValue >= i - 0.5) {
        stars.push(<StarHalfIcon key={i} className={styles.star} />);
      } else {
        stars.push(<StarIcon key={i} className={styles.star} />);
      }
    }
    return stars;
  }

  return (
    <div className={styles.page}>
      <div className={styles.breadcrumb}>
        <a className={styles.breadcrumbItem} href="/">
          Home
        </a>
        <a className={styles.breadcrumbItem} href="/movies">
          Movies
        </a>
        {loading ? (
          <Skeleton className={styles.breadcrumbSkeleton} skeletonType="text" />
        ) : (
          <a className={styles.breadcrumbItem}>{movieDetail?.Title}</a>
        )}
      </div>
      <div className={styles.main}>
        <div className={styles.leftContainer}>
          {loading ? (
            <Skeleton className={styles.posterContainer} skeletonType="rect" />
          ) : (
            <div className={styles.posterContainer}>
              {movieDetail?.Poster && movieDetail?.Poster !== "N/A" ? (
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
          )}
          {loading ? (
            <Skeleton skeletonType="text" />
          ) : (
            <div className={styles.briefContainer}>
              {movieDetail?.Language !== "N/A" && (
                <div className={styles.brief}>
                  <LanguageIcon className={styles.icon} />
                  <span className={styles.text}>{movieDetail?.Language}</span>
                </div>
              )}
              {movieDetail?.Country !== "N/A" && (
                <div className={styles.brief}>
                  <CountryIcon className={styles.icon} />
                  <span className={styles.text}>{movieDetail?.Country}</span>
                </div>
              )}
            </div>
          )}
        </div>
        <div className={styles.middleContainer}>
          {loading ? (
            <Skeleton skeletonType="text" />
          ) : (
            <div className={styles.dates}>
              <div className={styles.duration}>
                <ClockIcon className={styles.durationIcon} />
                <span className={styles.durationText}>{movieDetail?.Runtime !== "N/A" ? movieDetail?.Runtime : "-"}</span>
              </div>
              <div className={styles.releaseDate}>
                <CalendarIcon className={styles.releaseDateIcon} />
                <span className={styles.releaseDateText}>{movieDetail?.Released !== "N/A" ? movieDetail?.Released : "-"}</span>
                <span className={styles.releaseDateText}>{timeAgo(movieDetail?.Released)}</span>
              </div>
            </div>
          )}
          <Divider />
          <div className={styles.informations}>
            {loading ? <Skeleton skeletonType="text" /> : <h1 className={styles.title}>{movieDetail?.Title}</h1>}
            {loading ? <Skeleton skeletonType="text" /> : <p className={styles.description}>{movieDetail?.Plot}</p>}
          </div>
          <div className={styles.extraInformations}>
            {loading ? (
              <Skeleton skeletonType="text" />
            ) : (
              <div className={styles.ratingContainer}>
                <span className={styles.score}>
                  <span className={styles.rating}>{movieDetail?.imdbRating}/10</span>
                  <span className={styles.text}>on IMDb</span>
                  <span className={styles.text}>({movieDetail?.imdbVotes})</span>
                </span>
                <div className={styles.stars}>{calculateRating(movieDetail?.imdbRating || "0")}</div>
              </div>
            )}
            {loading ? <Skeleton skeletonType="text" /> : <span className={styles.imdbId}>{movieDetail?.imdbID}</span>}
          </div>
        </div>
        <div className={styles.rightContainer}>
          {loading ? (
            <Skeleton skeletonType="rect" />
          ) : (
            movieDetail?.Genre !== "N/A" && (
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
            )
          )}
          {loading ? (
            <Skeleton skeletonType="rect" />
          ) : (
            movieDetail?.Director !== "N/A" && (
              <>
                <div className={styles.list} data-type="directors">
                  <span className={styles.title}>Directors</span>
                  <div className={styles.listItems}>
                    {movieDetail?.Director?.split(", ").map((director) => (
                      <span key={director} className={styles.listItem}>
                        <DirectorIcon className={styles.icon} />
                        <span className={styles.text}>{director}</span>
                      </span>
                    ))}
                  </div>
                </div>
                <Divider />
              </>
            )
          )}
          {loading ? (
            <Skeleton skeletonType="rect" />
          ) : (
            movieDetail?.Writer !== "N/A" && (
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
            )
          )}
          {loading ? (
            <Skeleton skeletonType="rect" />
          ) : (
            movieDetail?.Actors !== "N/A" && (
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
              </>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieIdPage;
