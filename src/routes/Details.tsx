import { FunctionComponent } from "react";
import Toggle from "../components/Toggle";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMovieById } from "../queries/movieQueries";
import Spinner from "../components/Spinner";
import { useFavorite, useMutateToggleFavorite } from "../queries/favoriteQueries";
import { MovieType } from "../schemas/movie";

const FavoriteToggle: FunctionComponent<{ movie: MovieType }> = ({ movie }) => {
  const toggleFavorite = useMutateToggleFavorite();
  const isFavorite = useFavorite(movie.imdbID);
  return (
    <Toggle
      onToggle={(newToggleState) => {
        console.log(newToggleState);
        toggleFavorite.mutate(
          { id: movie.imdbID, newToggleState },
        );
      }}
      label="Favorite:"
      toggled={!!isFavorite.data}
    />
  );
};

const Detail: FunctionComponent = () => {
  const { movieId } = useParams();
  const { hasPrevious } = useLocation().state ?? {};
  const navigate = useNavigate();
  const movieQuery = useMovieById(movieId);

  if (movieId === undefined) {
    return <h1>oopsie woopsie</h1>;
  }

  if (movieQuery.isLoading) {
    // todo style this better
    return <Spinner />;
  }
  if (movieQuery.isError || movieQuery.data === undefined) {
    console.log(movieQuery.error);
    return (
      // todo normalize this
      <div>
        <h1>oopsie woopsie</h1>
      </div>
    );
  }
  const { data: movie } = movieQuery;

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          <div>
            <div className="w-full aspect-w-1 aspect-h-1">
              <img
                className="w-full h-full object-center object-cover sm:rounded-lg"
                src={movie.Poster}
              />
            </div>
          </div>
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <FavoriteToggle movie={movie} />
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
              {movie.Title}
            </h1>
            <div className="mt-3">
              <p className="text-3xl text-gray-900">{movie.Year}</p>
            </div>
            <div className="mt-3">
              <p className="text-xl text-gray-900">{movie.Actors}</p>
            </div>
            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <div className="text-base text-gray-700 space-y-6">
                <p>{movie.Plot}</p>
              </div>
            </div>
            {hasPrevious ? (
              <div className="mt-8 flex justify-between">
                <button role="link" onClick={() => navigate(-1)}>
                  Back to list
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
