import { services } from "@/services";
import { createSlice } from "@reduxjs/toolkit";

interface MovieState {
  list: Movie[];
  totalResults: number;
  loading: boolean;
  error: string | null;
}

const initialState: MovieState = {
  list: [],
  totalResults: 0,
  loading: false,
  error: null,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(services.fetchMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(services.fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.list;
        state.totalResults = action.payload.totalResults;
      })
      .addCase(services.fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default moviesSlice.reducer;
