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

import WinnerDetails from "../pages/Lists/WinnerDetails";

import PrizesLayout from "../pages/Lists/PrizesLayout";
import PrizeDetails from "../pages/Lists/PrizeDetails";

import RevoteLayout from "../pages/Lists/RevoteLayout";
import RevoteList from "../pages/Lists/RevoteList";
import ChangePassword from "../pages/ChangePassword";

import Users from "../pages/Users";
import SignUp from "../pages/SignUp";
import Message from "../pages/Message";
import FacebookMessage from "../pages/Lists/FacebookMessage";
import ViberMessage from "../pages/Lists/PrizesList";
import SmsLayout from "../pages/Lists/SmsLayout";
import SmsList from "../pages/Lists/SmsList";
import EmailLayout from "../pages/Lists/EmailLayout";
import EmailList from "../pages/Lists/EmailList";

// const Dashboard = lazy(() => import("../pages/Dashboard"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />

      <Route element={<PrivateRoute component={Layout} />}>
        {/* <Route path="dashboard" element={<Dashboard />} /> */}
        <Route path="participants" element={<Participants />} />

        <Route path="sent-message" element={<ListLayout />}>
          <Route path="facebook-message" element={<FacebookMessage />}>
            <Route index element={<FacebookMessage />} />
            <Route path=":id" element={<WinnerDetails />} />
          </Route>
          <Route path="rewards-list" element={<PrizesLayout />}>
            <Route index element={<ViberMessage />} />
            <Route path=":id" element={<PrizeDetails />} />
          </Route>
          <Route path="revote-list" element={<RevoteLayout />}>
            <Route index element={<RevoteList />} />
          </Route>

          <Route path="sms-message" element={<SmsLayout />}>
            <Route index element={<SmsList />} />
          </Route>
          <Route path="email-message" element={<EmailLayout />}>
            <Route index element={<EmailList />} />
          </Route>
        </Route>

        {/* <Route path="topup-logs" element={<TopupLog/>} /> */}
        <Route path="message" element={<Message />} />
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
