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
    <div className="container">
      <h2>{questao.tema}</h2>
      <p>{questao.texto}</p>
      {letras.map((letra) => {
        const textoAlternativa = questao[`alternativa_${letra.toLowerCase()}`];
        const selecionado = respostaSelecionada === letra;

        return (
          <p
            key={letra}
            onClick={() => setRespostaSelecionada(letra)}
            className={`${styles.alternativa} ${
              selecionado ? styles.selecionada : ""
            }`}
          >
            {textoAlternativa}
          </p>
        );
      })}
      <button onClick={verificarResposta} className={styles.button}>
        Responder
      </button>
      {feedback && <p className={styles.feedback}>{feedback}</p>}
    </div>
  );
}
