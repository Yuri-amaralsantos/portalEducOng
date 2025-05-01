import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import styles from "./Navbar.module.css";

export default function Sidebar({ visible }) {
  const navigate = useNavigate();
  const { isAdmin, loading } = useUser();

  return (
    <aside
      className={styles.sidebar}
      style={{ display: visible ? "flex" : "none" }}
    >
      <div className={styles.logo} onClick={() => navigate("/home")}>
        Instituto Abrams
      </div>
      {!loading && (
        <>
          <button onClick={() => navigate("/home")}>Início</button>
          <button onClick={() => navigate("/perfil")}>Perfil</button>
          <button onClick={() => navigate("/cursos")}>Cursos</button>
          <button onClick={() => navigate("/sobre")}>Sobre</button>
          <button onClick={() => navigate("/questoes")}>Questões</button>
          {isAdmin && (
            <button onClick={() => navigate("/admin")}>Administração</button>
          )}
        </>
      )}
    </aside>
  );
}
