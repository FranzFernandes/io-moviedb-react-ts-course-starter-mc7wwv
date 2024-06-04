import { movieSchema } from "./movie"
import * as v from 'valibot';

export const favoriteSchema = movieSchema;
export const editFavoriteSchema = v.object({
  Title: v.pipe(
    v.string(),
    v.nonEmpty("Title can't be empty")
  ),
  Year: v.pipe(
    v.string(),
    v.nonEmpty("Year can't be empty"),
    v.transform((input: string) => {
      return Number(input);
    }),
    v.minValue(0, "The year must be at least 0"),
    v.maxValue(2024, "The year must be at most the maximum year"),
    v.transform((input: number) => {
      return input.toString();
    })
  ),
  Actors: v.pipe(
    v.string(),
    v.nonEmpty("Actors can't be empty"),
  )
})
// calling this allFavorites instead of favoritesSchema, since the second 's' is hard to read
export const allFavoritesSchema = v.array(favoriteSchema);

export type FavoriteType = v.InferInput<typeof movieSchema>;
export type AllFavoritesType = Array<FavoriteType>;