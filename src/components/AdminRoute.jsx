// components/AdminRoute.jsx
import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function AdminRoute({ children }) {
  const { isAdmin, loading } = useUser();

  if (loading) return <p>Carregando...</p>;
  return isAdmin ? children : <Navigate to="/home" />;
}
