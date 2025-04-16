import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function CursosList() {
  const [cursos, setCursos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCursos = async () => {
      const { data, error } = await supabase.from("cursos").select("*");
      if (!error) setCursos(data);
    };
    fetchCursos();
  }, []);

  return (
    <div>
      <h2>Cursos Disponíveis</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {cursos.map((curso) => (
          <div
            key={curso.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "1rem",
              cursor: "pointer",
              width: "200px",
            }}
            onClick={() => navigate(`/curso/${curso.id}`)}
          >
            <h3>{curso.nome}</h3>
            <p>{curso.descricao}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
