import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import styles from "../../styles/Curso.module.css";

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
    <div className={styles.container}>
      {curso && (
        <div className={styles.cursoInfo}>
          <h2>{curso.nome}</h2>
          <p>
            <strong>Categoria:</strong>{" "}
            {curso.categoria || "Sem categoria definida."}
          </p>
          <p>{curso.descricao || "Sem descrição disponível."}</p>
        </div>
      )}

      <h3 className={styles.tituloAulas}>Aulas</h3>
      <div className={styles.grid}>
        {aulas.map((aula, index) => (
          <div
            key={aula.id}
            className="card"
            onClick={() => navigate(`/aula/${aula.id}`)}
          >
            <h4>Aula {index + 1}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}
