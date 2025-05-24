import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
// import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";

export default function PrivateRoute({ children }) {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div className="lodaing">loading...</div>;
  }

  if (currentUser) {
    return children;
  }

  return <Navigate to="/login" />;
}
