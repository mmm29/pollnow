import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./Layout";

import { NoPage } from "./pages/NoPage";
import { DashboardPage } from "./pages/DashboardPage";
import { LoginPage } from "./pages/LoginPage";
import { PollPage } from "./pages/PollPage";

export const PATHS = {
  HOME: "/",
  LOGIN: "/login",
  POLL: (pollId: string) => "/poll/" + pollId,
};

export function BRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="poll/:pollId" element={<PollPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </>
  );
}
