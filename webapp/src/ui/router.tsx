import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./Layout";

import NoPage from "./pages/NoPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

export function Router() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export function RedirectTo({ route }: { route: string }) {
  return <Navigate to={route} />;
}

export function RedirectToHome() {
  return <RedirectTo route="/" />;
}

export function RedirectToLogin() {
  return <RedirectTo route="/login" />;
}
