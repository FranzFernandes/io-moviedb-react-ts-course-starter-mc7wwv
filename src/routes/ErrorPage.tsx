import { useRouteError } from "react-router-dom";

export const ErrorPage = () => {
  const error = useRouteError();
  
  return (
    <div className="flex h-full w-full flex-col justify-center items-center gap-2">
      <h1 className="text-4xl text-slate-800">Oops!</h1>
      <p className="text-xl text-slate-600">Sorry, an unexpected error has occurred.</p>
      <p className="text-slate-600">
        {/* //TODO */}
        {/* @ts-ignore */}
        <i>{error?.statusText || error.message}</i>
      </p>
    </div>
  );

}
