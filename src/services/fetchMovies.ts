import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/utils/api";

function createYearList(list: Movie[]): OptionItem[] {
  const years = list.map((movie) => movie.Year.split("–")[0]);
  const uniqueYears = Array.from(new Set(years));

  uniqueYears.sort((a, b) => parseInt(b) - parseInt(a));

  return uniqueYears.map((year) => ({
    key: year,
    value: year,
    label: year,
  }));
}

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async ({ term, page, type, year }: { term: string; page: number; type?: string; year?: string }) => {
    const params = new URLSearchParams();

    params.append("s", term);
    if (type && type !== "undefined") {
      params.append("type", type);
    }
    if (year && year !== "undefined") {
      params.append("y", year);
    }
    params.append("page", page.toString());

    const response = await api.get<FetchMoviesResponse>(`?${params.toString()}`);
    const yearList = createYearList(response.data.Search);

    return {
      list: response.data.Search,
      totalResults: response.data.totalResults,
      yearList: yearList,
    };
  }
);
