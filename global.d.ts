type FetchMoviesResponse = {
  Search: Movie[];
  totalResults: number;
  Response: string;
};

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

type Genre = "movie" | "series" | "episode" | undefined;

type OptionItem = {
  disabled?: boolean;
  key: string;
  value: string;
  label: string;
};
