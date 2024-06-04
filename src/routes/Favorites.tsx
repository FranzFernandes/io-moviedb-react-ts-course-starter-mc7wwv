import { FunctionComponent } from 'react';

const Favorites: FunctionComponent = () => {
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    ></ul>
  );
};

export default Favorites;
