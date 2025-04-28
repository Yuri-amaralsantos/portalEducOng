// components/Navbar.jsx
import { supabase } from "../supabaseClient";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { user } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <nav className={styles.navbarTop}>
      <div className={styles.navbarActions}>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}
