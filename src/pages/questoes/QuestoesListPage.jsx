import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { Link } from "react-router-dom";

export default function QuestoesList() {
  const [questoes, setQuestoes] = useState([]);

  useEffect(() => {
    const fetchQuestoes = async () => {
      const { data, error } = await supabase.from("questoes").select("*");
      if (error) console.error(error);
      else setQuestoes(data);
    };

    fetchQuestoes();
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Lista de Questões</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {questoes.map((q) => (
          <Link
            key={q.id}
            to={`/questao/${q.id}`}
            style={{
              textDecoration: "none",
              color: "inherit",
              width: "250px",
            }}
          >
            <div
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "1rem",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                height: "100%",
                backgroundColor: "#f9f9f9",
              }}
            >
              <h4>{q.tema}</h4>
              <p>{q.texto.slice(0, 100)}...</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
