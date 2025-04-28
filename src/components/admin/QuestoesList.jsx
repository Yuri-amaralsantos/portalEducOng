import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import styles from "./Admin.module.css";

export default function QuestoesList() {
  const [questoes, setQuestoes] = useState([]);

  useEffect(() => {
    const fetchQuestoes = async () => {
      const { data } = await supabase.from("questoes").select("*");
      if (data) setQuestoes(data);
    };
    fetchQuestoes();
  }, []);

  const removerQuestao = async (id) => {
    if (!window.confirm("Remover questão?")) return;
    await supabase.from("questoes").delete().eq("id", id);
    setQuestoes((prev) => prev.filter((q) => q.id !== id));
  };

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <Link to="/admin/questao/nova" className={styles.newButton}>
          Nova Questão
        </Link>
      </nav>

      {questoes.map((q) => (
        <div key={q.id} className={styles.card}>
          <div>
            <h3>{q.tema}</h3>
            <p>{q.texto.slice(0, 80)}...</p>
          </div>
          <div className={styles.actions}>
            <Link to={`/admin/questao/${q.id}`}>
              <button className={styles.editar}>Editar</button>
            </Link>
            <button
              onClick={() => removerQuestao(q.id)}
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
