"use client";

import { useAppDispatch, useAppSelector } from "@/hooks";
import { fetchMovies } from "@/services/fetchMovies";
import { resetFilter } from "@/redux/slice";
import { genreOptions } from "@/constants/genre-options";
import { useEffect, useState } from "react";
import MovieList from "@/components/MovieList";
import SearchBox from "@/components/SearchBox";
import SelectBox from "@/components/SelectBox";
import Pagination from "@/components/Pagination";
import DisplayTypeButton from "@/components/DisplayTypeButton";

export default function Home() {
  const dispatch = useAppDispatch();
  const { list, totalResults, initialYearList, loading, error } = useAppSelector((state) => state.movies);

  const [activeDisplayType, setActiveDisplayType] = useState<"grid" | "table">("grid");
  const [activeSearch, setActiveSearch] = useState("Pokemon");
  const [activePage, setActivePage] = useState(1);
  const [activeYear, setActiveYear] = useState<string | undefined>(undefined);
  const [activeGenre, setActiveGenre] = useState<Genre | undefined>(undefined);

  function initialFetch() {
    dispatch(fetchMovies({ term: "Pokemon", page: activePage }));
  }

  function onSearch(search: string) {
    setActiveSearch(search);
    setActiveYear(undefined);
    setActiveGenre(undefined);
    setActivePage(1);
    dispatch(resetFilter());
  }

  useEffect(() => {
    initialFetch();
  }, []);

  useEffect(() => {
    dispatch(fetchMovies({ term: activeSearch, page: activePage, year: activeYear, type: activeGenre }));
  }, [activeSearch, activePage, activeYear, activeGenre]);

  return (
    <main className="flex min-h-screen flex-col items-center gap-4 p-24">
      <h1 className="text-4xl font-bold">Movies</h1>
      <div className="w-full grid grid-cols-[80px_2fr,2fr,5fr] gap-4">
        <DisplayTypeButton activeType={activeDisplayType} onTypeChange={setActiveDisplayType} />
        <SelectBox undefinedValueLabel="All Years" options={initialYearList} value={activeYear} onChange={(value) => setActiveYear(value)} />
        <SelectBox
          undefinedValueLabel="All Genres"
          options={genreOptions}
          value={activeGenre}
          onChange={(value) => setActiveGenre(value as Genre)}
        />
        <SearchBox onSearch={onSearch} />
      </div>

      {loading && <p>Loading...</p>}
      {error && (
        <div className="flex items-center justify-center">
          <p>Error: {error}</p>
          {/* <button className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md" onClick={() => onSearch()}>
            Clear Filters
          </button> */}
        </div>
      )}

      {!loading && !error && !list && <p>No movies found</p>}
      {!loading && !error && list && list.length > 0 && (
        <div className="w-full flex flex-col items-center gap-4">
          <MovieList displayType={activeDisplayType} />
          <Pagination totalResults={totalResults} perPage={10} currentPage={activePage} onPageChange={setActivePage} />
        </div>
      )}
    </main>
  );
}
