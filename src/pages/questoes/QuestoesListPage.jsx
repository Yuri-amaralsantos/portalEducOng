import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { Link } from "react-router-dom";
import styles from "./Questao.module.css";

export default function QuestoesList() {
  const [questoes, setQuestoes] = useState([]);
  const [selectedTema, setSelectedTema] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // Estado para a busca

  // Lista de temas
  const temas = [
    { name: "Matemática" },
    { name: "Português" },
    { name: "Ciências" },
    { name: "História" },
    { name: "Geografia" },
    { name: "Inglês" },
    // Adicione mais temas conforme necessário
  ];

  // Fetch questões
  useEffect(() => {
    const fetchQuestoes = async () => {
      const { data, error } = await supabase.from("questoes").select("*");
      if (error) console.error(error);
      else setQuestoes(data);
    };

    fetchQuestoes();
  }, []);

  // Filtrando as questões pelo tema selecionado e pelo texto da busca
  const filteredQuestoes = questoes.filter((q) => {
    const temaMatch = selectedTema ? q.tema === selectedTema : true;
    const textoMatch = q.texto
      .toLowerCase()
      .includes(searchQuery.toLowerCase()); // Filtra pelo texto da questão

    return temaMatch && textoMatch;
  });

  return (
    <div className="container">
      <h2>Lista de Questões</h2>

      {/* Campo de busca */}
      <div>
        <input
          type="text"
          id="searchInput"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Digite para buscar..."
        />
      </div>

      {/* Dropdown para seleção do tema */}
      <div>
        <label htmlFor="temaFilter">Filtrar por tema:</label>
        <select
          id="temaFilter"
          value={selectedTema}
          onChange={(e) => setSelectedTema(e.target.value)}
        >
          <option value="">Todos</option>
          {temas.map((tema) => (
            <option key={tema.name} value={tema.name}>
              {tema.name}
            </option>
          ))}
        </select>
      </div>

      {/* Exibindo as questões filtradas */}
      <div className={styles.cardList}>
        {filteredQuestoes.map((q) => (
          <Link key={q.id} to={`/questao/${q.id}`} className={styles.link}>
            <div className={styles.cardQuestao}>
              <h4>{q.tema}</h4>
              <p>{q.texto.slice(0, 100)}...</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
