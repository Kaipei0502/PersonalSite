import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../components/layout/RootLayout";

import HomePage from "../pages/Home/HomePage";
import ExperiencePage from "../pages/Experience/ExperiencePage";
import ProjectsPage from "../pages/Projects/ProjectsPage";
import AboutPage from "../pages/About/AboutPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "experience", element: <ExperiencePage /> },
      { path: "projects", element: <ProjectsPage /> },
      { path: "about", element: <AboutPage /> },
    ],
  },
]);
