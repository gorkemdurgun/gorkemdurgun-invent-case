import api from "@/utils/api";

export const getMovieById = async (id: string) => {
  const { data } = await api.get<MovieDetail>(`/?i=${id}`);
  return data;
};
