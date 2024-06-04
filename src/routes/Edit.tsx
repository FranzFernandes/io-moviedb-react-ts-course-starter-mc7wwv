import { FunctionComponent } from "react";
import { MovieType } from "../schemas/movie";
import { useLocation, useParams } from "react-router-dom";
import { useFavorite, useMutateFavorite } from "../queries/favoriteQueries";
import Spinner from "../components/Spinner";
import { editFavoriteSchema } from "../schemas/favorites";
import { useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import clsx from "clsx";

const EditForm: FunctionComponent<{ movie: MovieType }> = ({ movie }) => {
  const mutateFavorite = useMutateFavorite();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: movie,
    resolver: valibotResolver(editFavoriteSchema),
  });

  console.log(errors);

  return (
    <form onSubmit={handleSubmit((data) => {
      mutateFavorite.mutate({id: movie.imdbID, data: {...movie, ...data}})
    })}>
      <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <div className="mt-1">
            <input
              {...register("Title")}
              name="Title"
              type="text"
              aria-invalid={errors.Title ? "true" : "false"}
              defaultValue={movie.Title}
              className={clsx("shadow-sm p-2 block w-full sm:text-sm border-gray-300 rounded-md", {
                'ring-2 ring-red-500' : errors.Title,
              })}
            />
            {errors.Title ? <span className="text-red-500 text-sm">{errors.Title.message}</span> : null}
          </div>
        </div>

        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700">
            Year
          </label>
          <div className="mt-1">
            <input
              {...register("Year")}
              aria-invalid={errors.Year ? "true" : "false"}
              type="number"
              defaultValue={movie.Year}
              className={clsx("shadow-sm p-2 block w-full sm:text-sm border-gray-300 rounded-md", {
                'ring-2 ring-red-500' : errors.Year,
              })}
              />
              {errors.Year ? <span className="text-red-500 text-sm">{errors.Year.message}</span> : null}
          </div>
        </div>

        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700">
            Actors
          </label>
          <div className="mt-1">
            <input
              {...register("Actors")}
              type="text"
              aria-invalid={errors.Actors ? "true" : "false"}
              defaultValue={movie.Actors}
              className={clsx("shadow-sm p-2 block w-full sm:text-sm border-gray-300 rounded-md", {
                'ring-2 ring-red-500' : errors.Actors,
              })}
            />
          {errors.Actors ? <span className="text-red-500 text-sm">{errors.Actors.message}</span> : null}
          </div>
        </div>

        <div className="mt-8 flex justify-between">
          <button
            className="text-sm text-blue-500 hover:text-black"
            type="submit"
          >
            Save favorite
          </button>
        </div>
      </div>
    </form>
  );
};

const Edit: FunctionComponent = () => {
  const { movieId } = useParams();
  const movieQuery = useFavorite(movieId);

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
                src={movie.Poster}
                className="w-full h-full object-center object-cover sm:rounded-lg"
              />
            </div>
          </div>
          <EditForm movie={movie} />
        </div>
      </div>
    </div>
  );
};

export default Edit;
