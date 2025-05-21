import { useEffect } from "react";
import { useAuth } from "../hooks/auth";
import { useNavigate } from "react-router-dom";

export function LogoutPage() {
  const auth = useAuth();
  const navigate = useNavigate();

  async function logout() {
    await auth.logoutAction();
    navigate("/");
  }

  useEffect(() => {
    logout();
  }, []);

  return <></>;
}
