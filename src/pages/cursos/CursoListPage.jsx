import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { useNavigate } from "react-router-dom";
import styles from "./Curso.module.css";

export default function CursosList() {
  const [cursos, setCursos] = useState([]);
  const [filtro, setFiltro] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCursos = async () => {
      const { data, error } = await supabase.from("cursos").select("*");
      if (!error) setCursos(data);
    };
    fetchCursos();
  }, []);

  const cursosFiltrados = cursos.filter((curso) =>
    curso.nome.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <h2>Cursos Disponíveis</h2>

      <input
        type="text"
        className={styles.pesquisa}
        placeholder="Buscar curso..."
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
      />

      <div className={styles.grid}>
        {cursosFiltrados.map((curso) => (
          <div
            key={curso.id}
            className="card"
            onClick={() => navigate(`/curso/${curso.id}`)}
          >
            <h3>{curso.nome}</h3>
            <strong>
              <p>{curso.categoria || "Sem categoria definida"}</p>
            </strong>
          </div>
        ))}
      </div>
    </div>
  );
}
