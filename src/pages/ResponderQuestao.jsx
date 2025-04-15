import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";

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
    <div style={{ maxWidth: "600px", margin: "2rem auto" }}>
      <h2>{questao.tema}</h2>
      <p>{questao.texto}</p>
      {letras.map((letra) => (
        <div key={letra} style={{ marginBottom: "0.5rem" }}>
          <label>
            <input
              type="radio"
              name="resposta"
              value={letra}
              checked={respostaSelecionada === letra}
              onChange={() => setRespostaSelecionada(letra)}
            />{" "}
            <strong>{letra})</strong>{" "}
            {questao[`alternativa_${letra.toLowerCase()}`]}
          </label>
        </div>
      ))}
      <button onClick={verificarResposta} style={{ marginTop: "1rem" }}>
        Responder
      </button>
      {feedback && <p style={{ marginTop: "1rem" }}>{feedback}</p>}
    </div>
  );
}
