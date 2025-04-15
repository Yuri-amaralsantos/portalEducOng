import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function QuestaoForm() {
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
    <div style={{ marginTop: "2rem" }}>
      <h3>Criar Nova Questão</h3>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Tema"
          value={tema}
          onChange={(e) => setTema(e.target.value)}
          required
          style={{ display: "block", marginBottom: "0.5rem", width: "100%" }}
        />
        <textarea
          placeholder="Texto da questão"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          required
          style={{ display: "block", marginBottom: "0.5rem", width: "100%" }}
        />
        {["A", "B", "C", "D", "E"].map((letra) => (
          <input
            key={letra}
            placeholder={`Alternativa ${letra}`}
            value={alternativas[letra]}
            onChange={(e) => handleChangeAlternativa(letra, e.target.value)}
            required
            style={{ display: "block", marginBottom: "0.5rem", width: "100%" }}
          />
        ))}
        <label>
          Resposta correta:
          <select
            value={resposta}
            onChange={(e) => setResposta(e.target.value)}
            required
            style={{ display: "block", marginBottom: "1rem" }}
          >
            {["A", "B", "C", "D", "E"].map((letra) => (
              <option key={letra} value={letra}>
                {letra}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Criar Questão</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}
