interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

type Genre = "movie" | "series" | "episode" | undefined;
