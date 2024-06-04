import { FunctionComponent } from 'react';
import MovieCard from '../components/MovieCard';
import { useMoviesBySearch } from '../queries/movieQueries';
import { useSearchParams } from 'react-router-dom';

const Home: FunctionComponent = () => {
  const [searchParams] = useSearchParams({ search: "" });
  const movies = useMoviesBySearch(searchParams.get('search') ?? "")
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      {movies.isSuccess ? (
        movies.data.Search.map((movie) => (
          <MovieCard movie={movie}></MovieCard>
        ))
      ) : null}
    </ul>
  );
};

export default Home;
