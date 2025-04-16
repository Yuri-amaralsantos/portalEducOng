import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../supabaseClient";

export default function CursoList() {
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    const fetchCursos = async () => {
      const { data, error } = await supabase.from("cursos").select("*");
      if (error) console.error("Erro ao buscar cursos:", error.message);
      else setCursos(data);
    };

    fetchCursos();
  }, []);

  const removerCurso = async (cursoId) => {
    const confirmar = window.confirm(
      "Tem certeza que deseja remover este curso?"
    );
    if (!confirmar) return;

    await supabase.from("aulas").delete().eq("curso_id", cursoId);
    const { error } = await supabase.from("cursos").delete().eq("id", cursoId);

    if (error) {
      alert("Erro ao remover curso.");
      return;
    }

    setCursos((prev) => prev.filter((curso) => curso.id !== cursoId));
  };

  return (
    <div>
      <Link to={`/admin/curso/novo`}>
        <button style={{ marginBottom: "0.5rem" }}>Novo Curso</button>
      </Link>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {cursos.map((curso) => (
          <div
            key={curso.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "1rem",
              width: "200px",
            }}
          >
            <h3>{curso.nome}</h3>
            <Link to={`/admin/curso/${curso.id}`}>
              <button style={{ marginBottom: "0.5rem" }}>Editar</button>
            </Link>
            <button
              onClick={() => removerCurso(curso.id)}
              style={{ backgroundColor: "#f44336", color: "white" }}
            >
              Remover
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
