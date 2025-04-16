import { useState } from "react";
import { supabase } from "../../supabaseClient";
import { useNavigate } from "react-router-dom";
import styles from "./AdminPages.module.css";

export default function QuestaoForm() {
  const navigate = useNavigate();
  const [tema, setTema] = useState("");
  const [texto, setTexto] = useState("");
  const [alternativas, setAlternativas] = useState({
    A: "",
    B: "",
    C: "",
    D: "",
    E: "",
  });
  const [resposta, setResposta] = useState("A");
  const [mensagem, setMensagem] = useState("");

  const handleChangeAlternativa = (letra, value) => {
    setAlternativas((prev) => ({
      ...prev,
      [letra]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from("questoes").insert([
      {
        tema,
        texto,
        alternativa_a: alternativas.A,
        alternativa_b: alternativas.B,
        alternativa_c: alternativas.C,
        alternativa_d: alternativas.D,
        alternativa_e: alternativas.E,
        resposta,
      },
    ]);

    if (error) {
      console.error(error);
      setMensagem("Erro ao criar questão.");
    } else {
      setMensagem("Questão criada com sucesso!");
      setTema("");
      setTexto("");
      setAlternativas({ A: "", B: "", C: "", D: "", E: "" });
      setResposta("A");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          className={styles.input}
          placeholder="Tema"
          value={tema}
          onChange={(e) => setTema(e.target.value)}
          required
        />
        <textarea
          className={styles.textarea}
          placeholder="Texto da questão"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          required
        />
        {["A", "B", "C", "D", "E"].map((letra) => (
          <textarea
            key={letra}
            className={styles.textarea}
            placeholder={`Alternativa ${letra}`}
            value={alternativas[letra]}
            onChange={(e) => handleChangeAlternativa(letra, e.target.value)}
            required
          />
        ))}
        <label className={styles.label}>
          Resposta correta:
          <select
            className={styles.select}
            value={resposta}
            onChange={(e) => setResposta(e.target.value)}
            required
          >
            {["A", "B", "C", "D", "E"].map((letra) => (
              <option key={letra} value={letra}>
                {letra}
              </option>
            ))}
          </select>
        </label>
        <div className={styles.actions}>
          <button type="submit" className={styles.button}>
            Criar Questão
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin")}
            className={styles.voltarBtn}
          >
            Voltar
          </button>
        </div>
      </form>
      {mensagem && <p className={styles.mensagem}>{mensagem}</p>}
    </div>
  );
}
