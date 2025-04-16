import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../supabaseClient";

export default function QuestoesList() {
  const [questoes, setQuestoes] = useState([]);

  useEffect(() => {
    const fetchQuestoes = async () => {
      const { data, error } = await supabase.from("questoes").select("*");
      if (error) console.error("Erro ao buscar questões:", error.message);
      else setQuestoes(data);
    };

    fetchQuestoes();
  }, []);

  const removerQuestao = async (id) => {
    const confirmar = window.confirm(
      "Tem certeza que deseja remover esta questão?"
    );
    if (!confirmar) return;

    const { error } = await supabase.from("questoes").delete().eq("id", id);
    if (error) {
      alert("Erro ao remover questão.");
      return;
    }

    setQuestoes((prev) => prev.filter((q) => q.id !== id));
  };

  return (
    <div>
      <Link to="/admin/questao/nova">
        <button style={{ marginBottom: "0.5rem" }}>Nova Questão</button>
      </Link>
      <h2>Lista de Questões</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {questoes.map((q) => (
          <div
            key={q.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "1rem",
              width: "200px",
            }}
          >
            <h3>{q.tema}</h3>
            <p>{q.texto.slice(0, 100)}...</p>
            <Link to={`/admin/questao/${q.id}`}>
              <button style={{ marginBottom: "0.5rem" }}>Editar</button>
            </Link>
            <button
              onClick={() => removerQuestao(q.id)}
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
