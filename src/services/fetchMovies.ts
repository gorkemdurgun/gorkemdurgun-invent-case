import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async (term: string) => {
  const response = await axios.get(`http://www.omdbapi.com/?s=${term}&apikey=YOUR_API_KEY`);
  return response.data.Search;
});
