import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { useNavigate } from "react-router-dom";
import styles from "./Curso.module.css";

export default function CursosList() {
  const [cursos, setCursos] = useState([]);
  const [filtro, setFiltro] = useState(""); // Filtro de busca por nome
  const [categoriaFiltro, setCategoriaFiltro] = useState(""); // Filtro por categoria
  const navigate = useNavigate();

  // Fetched courses and categories
  useEffect(() => {
    const fetchCursos = async () => {
      const { data, error } = await supabase.from("cursos").select("*");
      if (!error) setCursos(data);
    };
    fetchCursos();
  }, []);

  // Filtrando os cursos com base no nome e na categoria
  const cursosFiltrados = cursos.filter((curso) => {
    const matchNome = curso.nome.toLowerCase().includes(filtro.toLowerCase());
    const matchCategoria = categoriaFiltro
      ? curso.categoria === categoriaFiltro
      : true;
    return matchNome && matchCategoria;
  });

  // Lista de categorias (essa lista pode vir do banco, se necessário)
  const categorias = [
    "Matemática",
    "Português",
    "Ciências",
    "História",
    "Geografia",
    "Inglês",
  ];

  return (
    <div className="container">
      <h2>Cursos Disponíveis</h2>

      {/* Filtro por nome */}
      <input
        type="text"
        className={styles.pesquisa}
        placeholder="Buscar curso..."
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
      />

      {/* Filtro por categoria */}
      <div>
        <label htmlFor="categoriaFiltro">Filtrar por categoria:</label>
        <select
          id="categoriaFiltro"
          value={categoriaFiltro}
          onChange={(e) => setCategoriaFiltro(e.target.value)}
        >
          <option value="">Todas as categorias</option>
          {categorias.map((categoria) => (
            <option key={categoria} value={categoria}>
              {categoria}
            </option>
          ))}
        </select>
      </div>

      {/* Exibindo os cursos filtrados */}
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
