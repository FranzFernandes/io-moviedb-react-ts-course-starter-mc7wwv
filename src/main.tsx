import React, { Children } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Home from "./routes/Home";
import Favorites from "./routes/Favorites";
import Edit from "./routes/Edit";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ErrorPage } from "./routes/ErrorPage";
import Detail from "./routes/Details";

export const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "favorites",
        element: <Favorites />,
      },
      {
        path: "favorites/edit/:movieId",
        element: <Edit />,
      },
      {
        path: "movie/:movieId",
        element: <Detail />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
