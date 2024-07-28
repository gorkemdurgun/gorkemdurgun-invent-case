type GetMoviesResponse = {
  Search: Movie[];
  totalResults: number;
  Response: string;
};

type GetMovieByIdResponse = MovieDetail;

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

interface MovieDetail {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  totalSeasons: string;
  Response: string;
}

type Genre = "movie" | "series" | "episode" | undefined;

type OptionItem = {
  disabled?: boolean;
  key: string;
  value: string;
  label: string;
};

type BreadcrumbItem = {
  label?: string;
  href?: string;
};
