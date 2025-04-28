import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./AdminPages.module.css";

export default function CursoForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nomeCurso, setNomeCurso] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [aulas, setAulas] = useState([{ link: "" }]);
  const [mensagem, setMensagem] = useState("");

  // Lista de matérias escolares
  const categories = [
    "Matemática",
    "Português",
    "Ciências",
    "História",
    "Geografia",
    "Inglês",
    // Adicione mais matérias conforme necessário
  ];

  useEffect(() => {
    if (!id) return;

    const fetchCurso = async () => {
      const { data: curso, error } = await supabase
        .from("cursos")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Erro ao carregar curso:", error.message);
        return;
      }

      setNomeCurso(curso.nome);
      setDescricao(curso.descricao || "");
      setCategoria(curso.categoria || "");

      const { data: aulasData, error: aulasError } = await supabase
        .from("aulas")
        .select("*")
        .eq("curso_id", id);

      if (aulasError) {
        console.error("Erro ao carregar aulas:", aulasError.message);
        return;
      }

      setAulas(aulasData.length ? aulasData : [{ link: "" }]);
    };

    fetchCurso();
  }, [id]);

  const adicionarAula = () => {
    setAulas([...aulas, { link: "" }]);
  };

  const removerAula = (index) => {
    const novasAulas = aulas.filter((_, i) => i !== index);
    setAulas(novasAulas.length ? novasAulas : [{ link: "" }]);
  };

  const handleAulaChange = (index, value) => {
    const novasAulas = [...aulas];
    novasAulas[index].link = value;
    setAulas(novasAulas);
  };

  const salvar = async () => {
    if (!nomeCurso.trim()) {
      setMensagem("O nome do curso é obrigatório.");
      return;
    }

    const camposInvalidos = aulas.some((a) => !a.link || !a.link.trim());
    if (camposInvalidos) {
      setMensagem("Todos os links das aulas devem ser preenchidos.");
      return;
    }

    let cursoId = id;

    if (!id) {
      const { data: curso, error } = await supabase
        .from("cursos")
        .insert([{ nome: nomeCurso, descricao, categoria }])
        .select()
        .single();

      if (error) {
        setMensagem("Erro ao criar curso.");
        return;
      }
      cursoId = curso.id;
    } else {
      await supabase
        .from("cursos")
        .update({ nome: nomeCurso, descricao, categoria })
        .eq("id", id);
      await supabase.from("aulas").delete().eq("curso_id", id);
    }

    const aulasComCursoId = aulas.map((a) => ({
      link: a.link,
      curso_id: cursoId,
    }));

    const { error: aulasErro } = await supabase
      .from("aulas")
      .insert(aulasComCursoId);

    if (aulasErro) {
      setMensagem("Erro ao salvar aulas.");
      return;
    }

    setMensagem("Curso salvo com sucesso!");
    navigate("/cursos");
  };

  return (
    <div className="container">
      <h2>{id ? "Editar Curso" : "Criar Curso"}</h2>
      {mensagem && <p className={styles.mensagem}>{mensagem}</p>}

      <div className={styles.formGroup}>
        <label>Nome do Curso:</label>
        <input
          value={nomeCurso}
          onChange={(e) => setNomeCurso(e.target.value)}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Descrição:</label>
        <textarea
          rows={4}
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
      </div>

      {/* Seleção de categoria */}
      <div className={styles.formGroup}>
        <label>Categoria:</label>
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        >
          <option value="">Selecione a categoria</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.header}>
        <h3>Aulas</h3>
        <button onClick={adicionarAula} className={styles.addBtn}>
          Adicionar Aula
        </button>
      </div>

      {aulas.map((aula, index) => (
        <div key={index} className={styles.aula}>
          <input
            placeholder="Link da aula"
            value={aula.link}
            onChange={(e) => handleAulaChange(index, e.target.value)}
          />
          <button
            onClick={() => removerAula(index)}
            className={styles.removerBtn}
          >
            Remover
          </button>
        </div>
      ))}

      <div className={styles.actions}>
        <button onClick={salvar}>Salvar</button>
        <button onClick={() => navigate("/admin")} className={styles.voltarBtn}>
          Voltar
        </button>
      </div>
    </div>
  );
}
