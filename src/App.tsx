import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import LoggedInLayout from "./LoggedInLayout";
import AdminLogin from "./pages/Login";
import Dashboard from "./pages/dashboard/Dashboard";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" index element={ <AdminLogin /> } />

      <Route element={<LoggedInLayout />} errorElement={""}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </>
  )
)

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
};

export default App;
