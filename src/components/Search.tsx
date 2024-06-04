import { FunctionComponent, useRef, useState } from "react";
import SearchIcon from "../icons/SearchIcon";
import { useNavigate, useSearchParams } from "react-router-dom";
import CloseIcon from "../icons/CloseIcon";

const Search: FunctionComponent = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchParams] = useSearchParams({ search: "" });
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") ?? ""
  );

  return (
    <div className="w-full">
      <label className="sr-only">{}</label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
          <SearchIcon />
        </div>
        <input
          className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
          placeholder="Type here to search for movies"
          type="search"
          ref={inputRef}
          value={searchValue}
          onChange={(event) => {
            setSearchValue(event.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              if (searchValue) {
                navigate(`/?search=${searchValue}`);
              }
            }
          }}
        />
        {searchValue ? (
          <button
            className="absolute inset-y-0 right-3 px-2 *:hover:text-gray-800"
            onClick={() => {
              setSearchValue("");
              inputRef.current?.focus();
              // not sure if it would be good to remove the searchparams as well
            }}
          >
            <CloseIcon className="size-5 text-gray-400" />
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Search;
