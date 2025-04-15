import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useParams, useNavigate } from "react-router-dom";

export default function CursoForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nomeCurso, setNomeCurso] = useState("");
  const [aulas, setAulas] = useState([{ nome: "", link: "" }]);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchCurso = async () => {
      const { data: curso, error } = await supabase
        .from("cursos")
        .select("*")
        .eq("id", id)
        .single();
      if (error) return console.error("Erro ao carregar curso:", error.message);

      setNomeCurso(curso.nome);

      const { data: aulasData, error: aulasError } = await supabase
        .from("aulas")
        .select("*")
        .eq("curso_id", id);

      if (aulasError)
        return console.error("Erro ao carregar aulas:", aulasError.message);

      setAulas(aulasData.length ? aulasData : [{ nome: "", link: "" }]);
    };

    fetchCurso();
  }, [id]);

  const adicionarAula = () => {
    setAulas([...aulas, { nome: "", link: "" }]);
  };

  const removerAula = (index) => {
    const novasAulas = aulas.filter((_, i) => i !== index);
    setAulas(novasAulas.length ? novasAulas : [{ nome: "", link: "" }]);
  };

  const handleAulaChange = (index, field, value) => {
    const novasAulas = [...aulas];
    novasAulas[index][field] = value;
    setAulas(novasAulas);
  };

  const salvar = async () => {
    if (!nomeCurso.trim()) {
      setMensagem("O nome do curso é obrigatório.");
      return;
    }

    const camposInvalidos = aulas.some((a) => !a.nome.trim() || !a.link.trim());

    if (camposInvalidos) {
      setMensagem("Todos os campos das aulas devem ser preenchidos.");
      return;
    }

    let cursoId = id;

    if (!id) {
      const { data: curso, error } = await supabase
        .from("cursos")
        .insert([{ nome: nomeCurso }])
        .select()
        .single();

      if (error) return setMensagem("Erro ao criar curso.");
      cursoId = curso.id;
    } else {
      await supabase.from("cursos").update({ nome: nomeCurso }).eq("id", id);
      await supabase.from("aulas").delete().eq("curso_id", id);
    }

    const aulasComId = aulas.map((a) => ({ ...a, curso_id: cursoId }));
    const { error: aulasErro } = await supabase
      .from("aulas")
      .insert(aulasComId);

    if (aulasErro) return setMensagem("Erro ao salvar aulas.");

    setMensagem("Curso salvo com sucesso!");
    navigate("/cursos");
  };

  return (
    <div>
      <h2>{id ? "Editar Curso" : "Criar Curso"}</h2>
      {mensagem && <p>{mensagem}</p>}

      <div>
        <label>Nome do Curso:</label>
        <input
          value={nomeCurso}
          onChange={(e) => setNomeCurso(e.target.value)}
        />
      </div>

      <h3>Aulas</h3>
      {aulas.map((aula, index) => (
        <div key={index} style={{ marginBottom: "10px" }}>
          <input
            placeholder="Nome da aula"
            value={aula.nome}
            onChange={(e) => handleAulaChange(index, "nome", e.target.value)}
          />
          <input
            placeholder="Link"
            value={aula.link}
            onChange={(e) => handleAulaChange(index, "link", e.target.value)}
          />
          <button onClick={() => removerAula(index)}>Remover</button>
        </div>
      ))}

      <button onClick={adicionarAula}>Adicionar Aula</button>
      <button onClick={salvar}>Salvar</button>
      <button onClick={() => navigate("/admin")}>Voltar</button>
    </div>
  );
}
