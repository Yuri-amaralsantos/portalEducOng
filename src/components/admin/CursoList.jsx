import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import styles from "./Admin.module.css";

export default function CursoList() {
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    const fetchCursos = async () => {
      const { data } = await supabase.from("cursos").select("*");
      if (data) setCursos(data);
    };
    fetchCursos();
  }, []);

  const removerCurso = async (cursoId) => {
    if (!window.confirm("Deseja remover este curso?")) return;

    await supabase.from("aulas").delete().eq("curso_id", cursoId);
    await supabase.from("cursos").delete().eq("id", cursoId);

    setCursos((prev) => prev.filter((curso) => curso.id !== cursoId));
  };

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <Link to="/admin/curso/novo" className={styles.newButton}>
          Novo Curso
        </Link>
      </nav>

      {cursos.map((curso) => (
        <div key={curso.id} className={styles.card}>
          <div>
            <h3>{curso.nome}</h3>
          </div>
          <div className={styles.actions}>
            <Link to={`/admin/curso/${curso.id}`}>
              <button>Editar</button>
            </Link>
            <button
              onClick={() => removerCurso(curso.id)}
              className={styles.remover}
            >
              Remover
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
