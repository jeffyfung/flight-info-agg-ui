import "@/app.scss";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./routes/layout/layout";
import ErrorPage from "./error-page";
import Dashboard, { dashboardLoader } from "./routes/dashboard/dashboard";
import Login from "./routes/login/login";
import { Profile, profileLoader } from "./routes/profile/profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
        loader: dashboardLoader,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "profile",
        element: <Profile />,
        loader: profileLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
