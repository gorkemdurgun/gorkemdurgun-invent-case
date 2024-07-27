"use client";

import { useAppDispatch, useAppSelector } from "@/hooks";
import { fetchMovies } from "@/services/fetchMovies";
import Image from "next/image";
import { useEffect, useState } from "react";
import MovieList from "@/components/MovieList";
import SearchBox from "@/components/SearchBox";
import SelectBox from "@/components/SelectBox";
import Pagination from "@/components/Pagination";

const yearOptions = [
  { key: "2024", value: "2024" },
  { key: "2023", value: "2023" },
  { key: "2022", value: "2022" },
  { key: "2021", value: "2021" },
  { key: "2020", value: "2020" },
  { key: "2019", value: "2019" },
];
const genreOptions = [
  {key: "movies", value: "Movies"},
  {key: "series", value: "Series"},
];

export default function Home() {
  const dispatch = useAppDispatch();
  const { list, loading, error } = useAppSelector((state) => state.movies);

  const [activePage, setActivePage] = useState(1);
  const [activeYear, setActiveYear] = useState("");
  const [activeGenre, setActiveGenre] = useState("");

  function doSearch(search: string) {
    dispatch(fetchMovies(search));
  }

  useEffect(() => {
    doSearch("Pokemon");
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center gap-4 p-24">
      <h1 className="text-4xl font-bold">Movies</h1>
      <div className="w-full grid grid-cols-[1fr,1fr,5fr] gap-4">
        <SelectBox options={yearOptions} value={activeYear} onChange={setActiveYear} />
        <SelectBox options={genreOptions} value={activeGenre} onChange={setActiveGenre} />
        <SearchBox onSubmit={doSearch} />
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && !list && <p>No movies found</p>}
      {list && list.length > 0 && (
        <div className="w-full flex flex-col items-center gap-4">
          <MovieList movies={list} />
          <Pagination totalPages={10} currentPage={activePage} onPageChange={setActivePage} />
        </div>
      )}
    </main>
  );
}
