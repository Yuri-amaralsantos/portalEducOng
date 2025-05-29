import { useUser } from "../context/UserContext";
import styles from "./Navbar.module.css";
import { useLocation, useNavigate } from "react-router-dom";

export default function Sidebar({ visible }) {
  const navigate = useNavigate();
  const { isAdmin, loading } = useUser();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <aside
      className={styles.sidebar}
      style={{ display: visible ? "flex" : "none" }}
    >
      <div className={styles.logo} onClick={() => navigate("/home")}>
        Instituto ABRAMS
      </div>
      {!loading && (
        <>
          <button
            onClick={() => navigate("/home")}
            className={isActive("/home") ? styles.activeButton : ""}
          >
            Início
          </button>
          <button
            onClick={() => navigate("/perfil")}
            className={isActive("/perfil") ? styles.activeButton : ""}
          >
            Perfil
          </button>
          <button
            onClick={() => navigate("/cursos")}
            className={isActive("/cursos") ? styles.activeButton : ""}
          >
            Cursos
          </button>
          <button
            onClick={() => navigate("/questoes")}
            className={isActive("/questoes") ? styles.activeButton : ""}
          >
            Questões
          </button>
          <button
            onClick={() => navigate("/jogos")}
            className={isActive("/jogos") ? styles.activeButton : ""}
          >
            Jogos
          </button>
          <button
            onClick={() => navigate("/sobre")}
            className={isActive("/sobre") ? styles.activeButton : ""}
          >
            Sobre
          </button>
          {isAdmin && (
            <button
              onClick={() => navigate("/admin")}
              className={isActive("/admin") ? styles.activeButton : ""}
            >
              Administração
            </button>
          )}
        </>
      )}
    </aside>
  );
}
