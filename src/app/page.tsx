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

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchMovies("Pokemon"));
  }, [dispatch]);

  console.log({ list, loading, error });

  return (
    <main className="flex min-h-screen flex-col items-center gap-4 p-24">
      <h1 className="text-4xl font-bold">Movies</h1>
      <SearchBox search={search} onSearch={setSearch} />
      {loading ? <p>Loading...</p> : error ? <p>{error}</p> : <MovieList movies={list} />}
    </main>
  );
}
