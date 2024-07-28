import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/utils/api";
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

    const response = await api.get(`?${params.toString()}`);
    return {
      list: response.data.Search,
      totalResults: response.data.totalResults,
    };
  }
);
