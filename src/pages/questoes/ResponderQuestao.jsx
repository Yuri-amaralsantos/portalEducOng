import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import styles from "./Questao.module.css";

export default function ResponderQuestao() {
  const { id } = useParams();
  const [questao, setQuestao] = useState(null);
  const [respostaSelecionada, setRespostaSelecionada] = useState("");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const fetchQuestao = async () => {
      const { data, error } = await supabase
        .from("questoes")
        .select("*")
        .eq("id", id)
        .single();

      if (error) console.error(error);
      else setQuestao(data);
    };

    fetchQuestao();
  }, [id]);

  const verificarResposta = () => {
    if (respostaSelecionada === questao.resposta) {
      setFeedback("✅ Resposta correta!");
    } else {
      setFeedback(`❌ Resposta incorreta. A correta é: ${questao.resposta}`);
    }
  };

  if (!questao) return <p>Carregando questão...</p>;

  const letras = ["A", "B", "C", "D", "E"];

  return (
    <div className={styles.container}>
      <h2>{questao.tema}</h2>
      <p>{questao.texto}</p>
      {letras.map((letra) => (
        <label
          key={letra}
          className={`${styles.option} ${
            respostaSelecionada === letra ? styles.selected : ""
          }`}
        >
          <input
            type="radio"
            name="resposta"
            value={letra}
            checked={respostaSelecionada === letra}
            onChange={() => setRespostaSelecionada(letra)}
            className={styles.hiddenRadio}
          />
          <strong>{letra})</strong>{" "}
          {questao[`alternativa_${letra.toLowerCase()}`]}
        </label>
      ))}
      <button onClick={verificarResposta} className={styles.button}>
        Responder
      </button>
      {feedback && <p className={styles.feedback}>{feedback}</p>}
    </div>
  );
}
