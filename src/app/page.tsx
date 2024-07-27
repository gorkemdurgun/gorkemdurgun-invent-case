"use client";

import { useAppDispatch, useAppSelector } from "@/hooks";
import { fetchMovies } from "@/services/fetchMovies";
import Image from "next/image";
import { useEffect, useState } from "react";
import MovieList from "@/components/MovieList";
import SearchBox from "@/components/SearchBox";

export default function Home() {
  const dispatch = useAppDispatch();
  const { list, loading, error } = useAppSelector((state) => state.movies);

  function doSearch(search: string) {
    dispatch(fetchMovies(search));
  }

  useEffect(() => {
    doSearch("Pokemon");
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center gap-4 p-24">
      <h1 className="text-4xl font-bold">Movies</h1>
      <SearchBox onSubmit={(search) => doSearch(search)} />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && !list && <p>No movies found</p>}
      {list && list.length > 0 && <MovieList movies={list} />}
    </main>
  );
}
