import {
  QueryClient,
  QueryFunctionContext,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import * as v from "valibot";
import { iterate, getItem, setItem, removeItem } from "localforage";
import {
  AllFavoritesType,
  FavoriteType,
  allFavoritesSchema,
  favoriteSchema,
} from "../schemas/favorites";
import { movieKeys } from "./movieQueries";
import { MovieType } from "../schemas/movie";

export const favoriteKeys = {
  favorite: (id: string) => ["favorite", { id }] as const,
  allFavorites: () => ["allFavorites"] as const,
};

const getAllFavorites = async (
  ctx: QueryFunctionContext<ReturnType<(typeof favoriteKeys)["allFavorites"]>>
) => {
  const [key] = ctx.queryKey;
  const favoriteItems: AllFavoritesType = [];
  await iterate((value: FavoriteType) => {
    favoriteItems.push(value);
  });
  console.log(v.safeParse(allFavoritesSchema, favoriteItems));
  return v.parse(allFavoritesSchema, favoriteItems);
};

const getFavorite = async (
  ctx: QueryFunctionContext<ReturnType<(typeof favoriteKeys)["favorite"]>>
) => {
  const [, { id }] = ctx.queryKey;
  const response = await getItem(id);
  return v.parse(favoriteSchema, response);
};

export const useFavorite = (id?: string) =>
  useQuery({
    queryKey: favoriteKeys.favorite(id ?? ''),
    queryFn: getFavorite,
    enabled: !!id,
  });

export const useAllFavorites = () =>
  useQuery({
    queryKey: favoriteKeys.allFavorites(),
    queryFn: getAllFavorites,
    initialData: [],
  });

  const invalidateAllFavorites = (queryClient: QueryClient, id: string) => {
    queryClient.invalidateQueries({
      queryKey: favoriteKeys.favorite(id),
    });
    queryClient.invalidateQueries({
      queryKey: favoriteKeys.allFavorites(),
    });
  }
export const useMutateToggleFavorite = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      newToggleState,
    }: {
      id: string;
      newToggleState: boolean;
    }) => {
      if (newToggleState) {
        const movieData = queryClient.getQueryData(movieKeys.movie(id));
        console.log(movieData);
        await setItem(id, movieData);
      } else {
        await removeItem(id);
      }
      invalidateAllFavorites(queryClient, id);
    },
  });
};

export const useMutateFavorite = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string,
      data: MovieType,
    }) => {
      await setItem(id, data);
      invalidateAllFavorites(queryClient, id);
    }
  })
}