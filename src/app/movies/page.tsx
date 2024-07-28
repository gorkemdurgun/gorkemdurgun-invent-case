"use client";

import { useAppDispatch, useAppSelector } from "@/hooks";
import { services } from "@/services";
import { resetFilter } from "@/redux/slice";
import { genreOptions } from "@/constants/genre-options";
import { useEffect, useState } from "react";
import Pagination from "@/components/common/Pagination";
import MovieList from "@/components/movies/MovieList";
import SearchBox from "@/components/movies/SearchBox";
import SelectBox from "@/components/movies/SelectBox";
import DisplayTypeButton from "@/components/movies/DisplayTypeButton";

export default function Home() {
  const dispatch = useAppDispatch();
  const { totalResults, initialYearList } = useAppSelector((state) => state.movies);

  const [activeDisplayType, setActiveDisplayType] = useState<DisplayType>("grid");
  const [activeSearch, setActiveSearch] = useState("Pokemon");
  const [activePage, setActivePage] = useState(1);
  const [activeYear, setActiveYear] = useState<string>("");
  const [activeGenre, setActiveGenre] = useState<string>("");

  function initialFetch() {
    dispatch(services.getMovies({ term: "Pokemon", page: activePage }));
  }

  function clearFilters() {
    setActivePage(1);
    setActiveYear("");
    setActiveGenre("");
    dispatch(resetFilter());
  }

  function onError() {
    if (activeSearch && (activeYear === "" || activeGenre === "")) {
      return;
    }
    clearFilters();
    onSearch(activeSearch);
  }

  function onSearch(search: string) {
    setActiveSearch(search);
    clearFilters();
  }

  useEffect(() => {
    initialFetch();
  }, []);

  useEffect(() => {
    dispatch(services.getMovies({ term: activeSearch, page: activePage, year: activeYear, type: activeGenre }));
  }, [activeSearch, activePage, activeYear, activeGenre]);

  return (
    <main className="flex min-h-screen flex-col items-center gap-6 p-24">
      <h1 className="text-4xl font-bold">Movie List from OMDB API</h1>
      <div className="w-full grid grid-cols-[80px_2fr,2fr,5fr] gap-4">
        <DisplayTypeButton disabled={totalResults === 0} activeType={activeDisplayType} onTypeChange={setActiveDisplayType} />
        <SelectBox
          disabled={totalResults === 0}
          undefinedValueLabel="All Years"
          options={initialYearList}
          value={activeYear}
          onChange={(value) => setActiveYear(value)}
        />
        <SelectBox
          disabled={totalResults === 0}
          undefinedValueLabel="All Genres"
          options={genreOptions}
          value={activeGenre}
          onChange={(value) => setActiveGenre(value)}
        />
        <SearchBox onSearch={onSearch} />
      </div>
      <div className="w-full flex flex-col items-center gap-4">
        <MovieList displayType={activeDisplayType} onError={onError} />
        <Pagination totalResults={totalResults} perPage={10} currentPage={activePage} onPageChange={setActivePage} />
      </div>
    </main>
  );
}
