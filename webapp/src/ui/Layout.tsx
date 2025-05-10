import { Outlet } from "react-router-dom";
import { Header } from "./components/Header";

export default function Layout() {
  return (
    <>
      <div className="min-h-full">
        <Header />
        <Outlet />
      </div>
    </>
  );
}
