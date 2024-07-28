"use client";

import { useAppDispatch, useAppSelector } from "@/hooks";
import { fetchMovies } from "@/services/fetchMovies";
import Image from "next/image";
import { useEffect, useState } from "react";
import MovieList from "@/components/MovieList";
import SearchBox from "@/components/SearchBox";
import SelectBox from "@/components/SelectBox";
import Pagination from "@/components/Pagination";
import DisplayTypeButton from "@/components/DisplayTypeButton";

const yearOptions = [
  { value: "2024", label: "2024" },
  { value: "2023", label: "2023" },
  { value: "2022", label: "2022" },
  { value: "2021", label: "2021" },
  { value: "2020", label: "2020" },
  { value: "2019", label: "2019" },
];
const genreOptions: {
  value: Genre;
  label: string;
}[] = [
  { value: "movie", label: "Movies" },
  { value: "series", label: "Series" },
  { value: "episode", label: "Episode" },
];

export default function Home() {
  const dispatch = useAppDispatch();
  const { list, totalResults, loading, error } = useAppSelector((state) => state.movies);

  const [activeDisplayType, setActiveDisplayType] = useState<"grid" | "table">("grid");
  const [activeSearch, setActiveSearch] = useState("Pokemon");
  const [activePage, setActivePage] = useState(1);
  const [activeYear, setActiveYear] = useState<string | undefined>(undefined);
  const [activeGenre, setActiveGenre] = useState<Genre | undefined>(undefined);

  function onSearch(search: string) {
    setActiveSearch(search);
  }

  useEffect(() => {
    dispatch(fetchMovies({ term: activeSearch, page: activePage, year: activeYear, type: activeGenre }));
  }, [activeSearch, activePage, activeYear, activeGenre]);

  return (
    <main className="flex min-h-screen flex-col items-center gap-4 p-24">
      <h1 className="text-4xl font-bold">Movies</h1>
      <div className="w-full grid grid-cols-[80px_2fr,2fr,5fr] gap-4">
        <DisplayTypeButton activeType={activeDisplayType} onTypeChange={setActiveDisplayType} />
        <SelectBox options={yearOptions} value={activeYear} onChange={(value) => setActiveYear(value)} />
        <SelectBox options={genreOptions} value={activeGenre} onChange={(value) => setActiveGenre(value as Genre)} />
        <SearchBox onSearch={onSearch} />
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && !list && <p>No movies found</p>}
      {list && list.length > 0 && (
        <div className="w-full flex flex-col items-center gap-4">
          <MovieList movies={list} displayType={activeDisplayType} />
          <Pagination totalResults={totalResults} perPage={10} currentPage={activePage} onPageChange={setActivePage} />
        </div>
      )}
    </main>
  );
}
