// components/ProtectedRoute.jsx
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { supabase } from "../supabaseClient";
import Navbar from "./Navbar";

export default function ProtectedLayout() {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);
    };

    checkSession();
  }, []);

  if (loading) return <div>Carregando...</div>;
  if (!session) return <Navigate to="/login" />;

  return (
    <>
      <Navbar />
      <div style={{ padding: "1rem" }}>
        <Outlet /> {/* <- AQUI é onde as rotas filhas vão aparecer */}
      </div>
    </>
  );
}
