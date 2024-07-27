"use client";

import MovieList from "@/components/MovieList";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { fetchMovies } from "@/services/fetchMovies";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  const dispatch = useAppDispatch();
  const { list, loading, error } = useAppSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchMovies("Pokemon"));
  }, [dispatch]);

  console.log({ list, loading, error });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between gap-4 p-24">
      <h1 className="text-4xl font-bold">Movies</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <MovieList movies={list} />
      )}
    </main>
  );
}
