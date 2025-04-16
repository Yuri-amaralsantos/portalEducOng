import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";

export default function CursoView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [curso, setCurso] = useState(null);
  const [aulas, setAulas] = useState([]);

  useEffect(() => {
    const fetchCurso = async () => {
      const { data } = await supabase
        .from("cursos")
        .select("*")
        .eq("id", id)
        .single();
      setCurso(data);
    };

    const fetchAulas = async () => {
      const { data } = await supabase
        .from("aulas")
        .select("*")
        .eq("curso_id", id);
      setAulas(data);
    };

    fetchCurso();
    fetchAulas();
  }, [id]);

  return (
    <div>
      {curso && <h2>{curso.nome}</h2>}
      <h3>Aulas</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {aulas.map((aula) => (
          <div
            key={aula.id}
            style={{
              border: "1px solid #ccc",
              padding: "1rem",
              borderRadius: "8px",
              cursor: "pointer",
              width: "200px",
            }}
            onClick={() => navigate(`/aula/${aula.id}`)}
          >
            <h4>{aula.nome}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}
