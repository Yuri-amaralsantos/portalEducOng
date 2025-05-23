import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { supabase } from "../supabaseClient";
import Navbar from "./Navbar";
import Sidebar from "./SideBar";
import styles from "./Navbar.module.css"; // vamos corrigir aqui

export default function ProtectedLayout() {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(true);

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
      <Navbar onToggleSidebar={() => setSidebarVisible(!sidebarVisible)} />
      <div className={styles.layout}>
        <div
          className={`${styles.sidebarWrapper} ${
            sidebarVisible ? styles.sidebarOpen : styles.sidebarClosed
          }`}
        >
          <Sidebar visible={sidebarVisible} />
        </div>
        <main className={styles.mainContent}>
          <Outlet />
        </main>
      </div>
    </>
  );
}
