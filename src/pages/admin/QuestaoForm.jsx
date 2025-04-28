import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import styles from "./AdminPages.module.css";

export default function QuestaoForm() {
  const navigate = useNavigate();
  const { id } = useParams(); // Para pegar o ID da questão
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

  useEffect(() => {
    const fetchQuestao = async () => {
      if (id) {
        const { data, error } = await supabase
          .from("questoes")
          .select("*")
          .eq("id", id)
          .single();
        if (error) {
          console.error(error);
          setMensagem("Erro ao carregar a questão.");
        } else if (data) {
          setTema(data.tema);
          setTexto(data.texto);
          setAlternativas({
            A: data.alternativa_a,
            B: data.alternativa_b,
            C: data.alternativa_c,
            D: data.alternativa_d,
            E: data.alternativa_e,
          });
          setResposta(data.resposta);
        }
      }
    };

    fetchQuestao();
  }, [id]);

  const handleChangeAlternativa = (letra, value) => {
    setAlternativas((prev) => ({
      ...prev,
      [letra]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = id
      ? await supabase
          .from("questoes")
          .update({
            tema,
            texto,
            alternativa_a: alternativas.A,
            alternativa_b: alternativas.B,
            alternativa_c: alternativas.C,
            alternativa_d: alternativas.D,
            alternativa_e: alternativas.E,
            resposta,
          })
          .eq("id", id)
      : await supabase.from("questoes").insert([
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
      setMensagem("Erro ao salvar questão.");
    } else {
      setMensagem("Questão salva com sucesso!");
      setTema("");
      setTexto("");
      setAlternativas({ A: "", B: "", C: "", D: "", E: "" });
      setResposta("A");
      navigate("/admin"); // Redireciona para a página de administração após salvar
    }
  };

  // Lista de temas
  const temas = [
    "Matemática",
    "Português",
    "Ciências",
    "História",
    "Geografia",
    "Inglês",
  ];

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Select para escolher o tema */}
        <label className={styles.label}>
          Tema:
          <select
            className={styles.select}
            value={tema}
            onChange={(e) => setTema(e.target.value)}
            required
          >
            <option value="">Selecione um tema</option>
            {temas.map((temaOption) => (
              <option key={temaOption} value={temaOption}>
                {temaOption}
              </option>
            ))}
          </select>
        </label>

        {/* Campo de texto da questão */}
        <textarea
          className={styles.textarea}
          placeholder="Texto da questão"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          required
        />

        {/* Alternativas */}
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

        {/* Resposta correta */}
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

        {/* Ações do formulário */}
        <div className={styles.actions}>
          <button type="submit" className={styles.btn}>
            {id ? "Salvar Questão" : "Criar Questão"}
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

      {/* Mensagem de status */}
      {mensagem && <p className={styles.mensagem}>{mensagem}</p>}
    </div>
  );
}
