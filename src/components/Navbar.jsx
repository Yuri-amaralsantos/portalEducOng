import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext"; // Se usar useUser
import { supabase } from "../supabaseClient";
import styles from "./Navbar.module.css";

export default function Navbar({ onToggleSidebar }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <nav className={styles.navbarTop}>
      {/* Botão ☰ visível apenas em telas menores */}
      <button className={styles.toggleButton} onClick={onToggleSidebar}>
        ☰
      </button>

      <div className={styles.navbarActions}>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}
