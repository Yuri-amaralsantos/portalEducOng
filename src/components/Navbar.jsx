// components/Navbar.jsx
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useUser } from "../context/UserContext";

export default function Navbar() {
  const { user, isAdmin } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <nav
      style={{
        backgroundColor: "#eee",
        padding: "1rem",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div>
        <button
          onClick={() => navigate("/home")}
          style={{ marginRight: "1rem" }}
        >
          Início
        </button>
        <button
          onClick={() => navigate("/perfil")}
          style={{ marginRight: "1rem" }}
        >
          Perfil
        </button>
        <button
          onClick={() => navigate("/cursos")}
          style={{ marginRight: "1rem" }}
        >
          Cursos
        </button>
        <button
          onClick={() => navigate("/questoes")}
          style={{ marginRight: "1rem" }}
        >
          Questões
        </button>
        {isAdmin && (
          <button
            onClick={() => navigate("/admin")}
            style={{ marginRight: "1rem" }}
          >
            Administração
          </button>
        )}
      </div>
      <div>
        {user && <span style={{ marginRight: "1rem" }}>{user.email}</span>}
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}
