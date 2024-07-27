import api from "@/utils/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async (term: string) => {
  const response = await api.get(`?s=${term}`);
  return response.data.Search;
});
