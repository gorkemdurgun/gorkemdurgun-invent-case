import { services } from "@/services";
import { createSlice } from "@reduxjs/toolkit";

interface MovieState {
  list: Movie[];
  totalResults: number;
  yearList: OptionItem[];
  initialYearList: OptionItem[];
  loading: boolean;
  error: string | null;
}

const initialState: MovieState = {
  list: [],
  totalResults: 0,
  yearList: [],
  initialYearList: [],
  loading: false,
  error: null,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    resetFilter(state) {
      state.initialYearList = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(services.getMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(services.getMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.list = action.payload.list;
        state.totalResults = action.payload.totalResults;
        state.yearList = action.payload.yearList;
        if (state.initialYearList.length === 0) {
          state.initialYearList = action.payload.yearList;
        }
      })
      .addCase(services.getMovies.rejected, (state, action) => {
        state.loading = false;
        state.list = [];
        state.totalResults = 0;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export const { resetFilter } = moviesSlice.actions;

export default moviesSlice.reducer;
