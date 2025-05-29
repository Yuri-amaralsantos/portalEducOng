import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { jogos } from "../pages/jogos/dataList";
import styles from "./Home.module.css";

export default function Home() {
  const [cursos, setCursos] = useState([]);
  const [questoes, setQuestoes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const { data: cursosData } = await supabase
        .from("cursos")
        .select("*")
        .order("id", { ascending: false })
        .limit(3);

      const { data: questoesData } = await supabase
        .from("questoes")
        .select("*")
        .order("id", { ascending: false })
        .limit(3);

      setCursos(cursosData || []);
      setQuestoes(questoesData || []);
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <section className={styles.hero}>
        <h1>Bem-vindo ao Portal Educacional!</h1>
        <p>
          Aqui você encontra cursos interativos, jogos educacionais e questões
          para testar seus conhecimentos. Explore e aprenda de forma divertida!
        </p>
      </section>

      <section className={styles.section}>
        <h2>Cursos Recentes</h2>
        <div className={styles.grid}>
          {cursos.map((curso) => (
            <div
              key={curso.id}
              className="card"
              onClick={() => navigate(`/curso/${curso.id}`)}
            >
              <h3>{curso.nome}</h3>
              <p>{curso.categoria}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2>Questões Recentes</h2>
        <div className={styles.grid}>
          {questoes.map((q) => (
            <Link
              to={`/questao/${q.id}`}
              key={q.id}
              className={styles.cardLink}
            >
              <div className="card">
                <h4>{q.tema}</h4>
                <p>{q.texto.slice(0, 100)}...</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2>Jogos Recentes</h2>
        <div className={styles.grid}>
          {jogos
            .slice(-3)
            .reverse()
            .map((jogo) => (
              <div
                key={jogo.id}
                className="card"
                onClick={() => navigate(`/jogos/${jogo.id}`)}
              >
                <img
                  src={jogo.imagem}
                  alt={jogo.nome}
                  className={styles.jogoImagem}
                />
                <h3>{jogo.nome}</h3>
                <p>{jogo.descricao}</p>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}
