import { Fragment, FunctionComponent } from "react";
import {
  useAllFavorites,
  useMutateToggleFavorite,
} from "../queries/favoriteQueries";
import Spinner from "../components/Spinner";
import MovieCard, { FavoriteCard } from "../components/MovieCard";

const Favorites: FunctionComponent = () => {
  const favorites = useAllFavorites();
  const toggleFavorite = useMutateToggleFavorite();
  if (favorites.status === "error") {
    console.log(favorites.error);
    return <h1>oopsie woopsie</h1>;
  }
  if (favorites.isLoading) {
    return <Spinner />;
  }
  if (favorites.data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-2xl">You don't have any favorites</h1>
        <p className="text-lg">
          Add some favorites by clicking on the toggle next to your favorite
          movie
        </p>
      </div>
    );
  }
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      {favorites.data.map((favorite) => (
        <Fragment key={favorite.imdbID}>
          <FavoriteCard
            onDelete={(movieId) => {
              toggleFavorite.mutate({ id: movieId, newToggleState: false });
            }}
            movie={favorite}
          ></FavoriteCard>
        </Fragment>
      ))}
    </ul>
  );
};

export default Favorites;
