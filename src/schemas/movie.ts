import * as v from "valibot";

export const movieRatingSchema = v.object({
  Source: v.string(),
  Value: v.string(),
});

export const movieSchema = v.object({
  Actors: v.string(),
  Awards: v.string(),
  BoxOffice: v.string(),
  Country: v.string(),
  Director: v.string(),
  DVD: v.string(),
  Genre: v.string(),
  imdbID: v.string(),
  imdbRating: v.string(),
  imdbVotes: v.string(),
  Language: v.string(),
  Metascore: v.string(),
  Plot: v.string(),
  Poster: v.string(),
  Production: v.string(),
  Rated: v.string(),
  Ratings: v.array(movieRatingSchema),
  Released: v.string(),
  Response: v.string(),
  Runtime: v.string(),
  Title: v.string(),
  Type: v.string(),
  Website: v.string(),
  Writer: v.string(),
  Year: v.string(),
});

export const searchMoviesSchema = v.object({
  Search: v.array(
    v.pick(movieSchema, ["Title", "Year", "imdbID", "Type", "Poster"])
  ),
  totalResults: v.string(),
  Response: v.string(),
});

export type MovieType = v.InferInput<typeof movieSchema>;
export type SearchMoviesType = v.InferInput<
  typeof searchMoviesSchema
>["Search"][number];
