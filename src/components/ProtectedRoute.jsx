// components/ProtectedRoute.jsx
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { supabase } from "../supabaseClient";
import Navbar from "./Navbar";
import Sidebar from "./SideBar";

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
      <div style={{ display: "flex" }}>
        <Sidebar />
        <main style={{ marginLeft: "50px", flex: 1 }}>
          <Outlet />
        </main>
      </div>
    </>
  );
}
