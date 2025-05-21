import { useEffect } from "react";
import { useAuth } from "../hooks/auth";
import { useNavigate } from "react-router-dom";

export function LogoutPage() {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    auth.logoutAction().then(() => {
      navigate("/");
    });
  }, []);

  return <></>;
}
