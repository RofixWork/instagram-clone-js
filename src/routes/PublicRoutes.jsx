import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../firebase";

const PublicRoutes = () => {
  const [user] = useAuthState(auth);
  return user ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoutes;
