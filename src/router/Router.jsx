import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import PrivateRoute from "../hocs/PrivateRoute";
import Login from "../pages/Login";

import Layout from "../Layout";
import Participants from "../pages/Participants";
import Prize from "../pages/Prize";

import ListLayout from "../pages/Lists/ListLayout";
import PrizesList from "../pages/Lists/PrizesList";
import WinnersList from "../pages/Lists/WinnersList";
import WinnerDetails from "../pages/Lists/WinnerDetails";
import WinnersLayout from "../pages/Lists/WinnersLayout";
import PrizesLayout from "../pages/Lists/PrizesLayout";
import PrizeDetails from "../pages/Lists/PrizeDetails";
import WinningRatio from "../pages/WinningRatio/WinningRatio";
import WinningRatioLayout from "../pages/WinningRatio/WinningRatioLayout";
import WinningRatioHistory from "../pages/WinningRatio/WinningRatioHistory";
import RevoteLayout from "../pages/Lists/RevoteLayout";
import RevoteList from "../pages/Lists/RevoteList";
import ChangePassword from "../pages/ChangePassword";
import TopupLog from "../pages/TopupLog";
import Users from "../pages/Users";
import SignUp from "../pages/SignUp";

// const Dashboard = lazy(() => import("../pages/Dashboard"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
      
      <Route element={<PrivateRoute component={Layout} />}>
        {/* <Route path="dashboard" element={<Dashboard />} /> */}
        <Route path="participants" element={<Participants />} />
        <Route path="prizes" element={<Prize />} />

        <Route path="spin-result" element={<ListLayout />}>
          <Route path="winners-list" element={<WinnersLayout />}>
            <Route index element={<WinnersList />} />
            <Route path=":id" element={<WinnerDetails />} />
          </Route>
          <Route path="rewards-list" element={<PrizesLayout />}>
            <Route index element={<PrizesList />} />
            <Route path=":id" element={<PrizeDetails />} />
          </Route>
          <Route path="revote-list" element={<RevoteLayout />}>
            <Route index element={<RevoteList />} />
          </Route>
        </Route>

        <Route path="topup-logs" element={<TopupLog/>} />

        <Route path="winning-ratio" element={<WinningRatioLayout />}>
          <Route index element={<WinningRatio />} />
          <Route path="history" element={<WinningRatioHistory />} />
        </Route>

        <Route path="change-password" element={<ChangePassword />} />
        <Route path="users" element={<Users />} />
        

        <Route path="*" element={<Navigate to="participants" replace />} />
      </Route>
    </>
  )
);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
