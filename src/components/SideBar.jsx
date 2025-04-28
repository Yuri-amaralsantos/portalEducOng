// components/Sidebar.jsx
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import styles from "./Navbar.module.css";

export default function Sidebar() {
  const navigate = useNavigate();
  const { isAdmin, loading } = useUser();

  if (loading) return null;

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo} onClick={() => navigate("/home")}>
        Instituto Abrams
      </div>
      <button onClick={() => navigate("/home")}>Início</button>
      <button onClick={() => navigate("/perfil")}>Perfil</button>
      <button onClick={() => navigate("/cursos")}>Cursos</button>
      <button onClick={() => navigate("/questoes")}>Questões</button>
      {isAdmin && (
        <button onClick={() => navigate("/admin")}>Administração</button>
      )}
    </aside>
  );
}
