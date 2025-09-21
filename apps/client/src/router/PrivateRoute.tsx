import { Navigate } from "react-router-dom";
import { useCurrentUser } from "../stores/user";

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useCurrentUser();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};
