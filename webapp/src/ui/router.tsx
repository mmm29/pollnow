import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./Layout";

import { NoPage } from "./pages/NoPage";
import { DashboardPage } from "./pages/DashboardPage";
import { LoginPage } from "./pages/LoginPage";
import { PollPage } from "./pages/PollPage";
import { NewPollPage } from "./pages/NewPollPage";

export function BRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="poll/:pollId" element={<PollPage />} />
          <Route path="new" element={<NewPollPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </>
  );
}
