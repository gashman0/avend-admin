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
import UsersPage from "./pages/dashboard/Users";
import Deposits from "./pages/dashboard/Deposits";
import Withdrawals from "./pages/dashboard/Withdrawals";
import Transactions from "./pages/dashboard/Transactions";
import Investments from "./pages/dashboard/Investments";
import InvestmentPlan from "./pages/dashboard/InvestmentPlans";
import Referrals from "./pages/dashboard/Referrals";
import Settings from "./pages/dashboard/Settings";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" index element={ <AdminLogin /> } />

      <Route element={<LoggedInLayout />} errorElement={""}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/deposits" element={<Deposits />} />
        <Route path="/withdrawals" element={<Withdrawals />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/investments" element={<Investments />} />
        <Route path="/plans" element={<InvestmentPlan />} />
        <Route path="/referrals" element={<Referrals />} />
        <Route path="/settings" element={<Settings />} />
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
