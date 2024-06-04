import { FunctionComponent, ReactNode } from "react";
import { MovieType, SearchMoviesType } from "../schemas/movie";
import { Link, useLocation } from "react-router-dom";

const BaseMovieCard: FunctionComponent<{children?: ReactNode, movie: SearchMoviesType, to: string, state?: {hasPrevious: boolean}}> = ({
  children,
  movie,
  to,
  state,
}) => {
  return (
    <Link
      to={to}
      state={state}
      className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200"
    >
      <div className="flex-1 flex flex-col">
        {/* //todo add loader + if no image found */}
        <img
          className="h-48 mx-auto mt-4"
          loading="lazy"
          src={`${movie.Poster.replace('http://', 'https://')}`}
        />
        <div className="p-4">
          <h3 className="mt-6 text-gray-900 text-sm font-medium">
            {movie.Title}
          </h3>
          <dl className="mt-1 flex-grow flex flex-col justify-between">
            <dd className="text-gray-500 text-sm">{movie.Year}</dd>
          </dl>
        </div>
      </div>
      {children}
    </Link>
  )
}

export const MovieCard: FunctionComponent<{ movie: SearchMoviesType }> = ({
  movie,
}) => {
  return (
    <BaseMovieCard movie={movie} to={`movie/${movie.imdbID}`} state={{hasPrevious: true}} />
  );
};

export const FavoriteCard: FunctionComponent<{movie: SearchMoviesType, onDelete: (id: string) => void}> = ({
  movie,
  onDelete,
}) => {
  return (
    <BaseMovieCard movie={movie} to={`/favorites/edit/${movie.imdbID}`}>
      <div className="flex w-full">
        <Link to={`/favorites/edit/${movie.imdbID}`} className="bg-white hover:bg-gray-200 text-orange-500 grow">Edit</Link>
        <button onClick={(event) => {event.preventDefault(); onDelete(movie.imdbID)}} type="button" className="bg-white hover:bg-gray-200 text-red-500 grow">Delete</button>
      </div>
    </BaseMovieCard>
  )
}


export default MovieCard;
