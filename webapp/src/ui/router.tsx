import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./Layout";

import { NoPage } from "./pages/NoPage";
import { DashboardPage } from "./pages/DashboardPage";
import { LoginPage, RegisterPage } from "./pages/LoginPage";
import { PollPage } from "./pages/PollPage";
import { NewPollPage } from "./pages/NewPollPage";
import { LogoutPage } from "./pages/LogoutPage";
import { SettingsPage } from "./pages/SettingsPage";
import { MyPollsPage } from "./pages/MyPollsPage";
import { ReactNode } from "react";
import { useAuth } from "./hooks/auth";

function AuthenticatedRoute({ children }: { children: ReactNode }) {
  const auth = useAuth();

  if (!auth.loggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
}

export function BRoutes() {
  const authenticatedRoutes = [
    {
      path: "dashboard",
      element: <DashboardPage />,
    },
    {
      path: "poll/:pollId",
      element: <PollPage />,
    },
    {
      path: "new",
      element: <NewPollPage />,
    },
    {
      path: "settings",
      element: <SettingsPage />,
    },
    {
      path: "mypolls",
      element: <MyPollsPage />,
    },
  ];

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          {authenticatedRoutes.map((route) => (
            <>
              <Route
                path={route.path}
                element={
                  <AuthenticatedRoute>{route.element}</AuthenticatedRoute>
                }
              />
            </>
          ))}
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="logout" element={<LogoutPage />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </>
  );
}
