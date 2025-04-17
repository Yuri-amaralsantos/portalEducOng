import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { Link } from "react-router-dom";
import styles from "./Questao.module.css";

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
    <div className={styles.container}>
      <h2>Lista de Questões</h2>
      <div className={styles.cardList}>
        {questoes.map((q) => (
          <Link key={q.id} to={`/questao/${q.id}`} className={styles.link}>
            <div className={styles.card}>
              <h4>{q.tema}</h4>
              <p>{q.texto.slice(0, 100)}...</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
