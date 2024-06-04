import * as v from "valibot";
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import { movieSchema, searchMoviesSchema } from "../schemas/movie";

const OMDB_BASE_QUERY_URL = `http://omdbapi.com?apikey=${
  import.meta.env.VITE_OMDB_API_KEY
}`;

// Old way of doing a query "factory".
// Nowadays you can just use this package instead https://github.com/lukemorales/query-key-factory
export const movieKeys = {
  movies: (search: string) => ["movies", { search }] as const,
  movie: (id: string) => ["movie", id] as const,
};

const getMovieById = async (
  ctx: QueryFunctionContext<ReturnType<(typeof movieKeys)["movie"]>>
) => {
  const [, id] = ctx.queryKey;
  // make sure that a movie id is given.
  const idSchema = v.pipe(v.string(), v.nonEmpty("No movie id given"));
  v.parse(idSchema, id);
  const response = await fetch(`${OMDB_BASE_QUERY_URL}&i=${id}&type=movie`);
  const movie = await response.json();
  return v.parse(movieSchema, movie);
};

const getMoviesBySearch = async (
  ctx: QueryFunctionContext<ReturnType<(typeof movieKeys)["movies"]>>
) => {
  const [, { search }] = ctx.queryKey;
  const response = await fetch(`${OMDB_BASE_QUERY_URL}&s=${search}&type=movie`);
  const movies = await response.json();
  return v.parse(searchMoviesSchema, movies);
};

export const useMovieById = (id?: string) =>
  useQuery({
    queryKey: movieKeys.movie(id ?? ''),
    queryFn: getMovieById,
    enabled: !!id,
  });

export const useMoviesBySearch = (search: string) =>
  useQuery({
    queryKey: movieKeys.movies(search),
    queryFn: getMoviesBySearch,
    enabled: search.length !== 0,
  });
