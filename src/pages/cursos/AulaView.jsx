import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import styles from "../../styles/Curso.module.css";

export default function AulaView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [aula, setAula] = useState(null);
  const [aulas, setAulas] = useState([]);
  const [indice, setIndice] = useState(null);

  useEffect(() => {
    const fetchAula = async () => {
      const { data: aulaData } = await supabase
        .from("aulas")
        .select("*")
        .eq("id", id)
        .single();

      if (aulaData) {
        setAula(aulaData);

        // Buscar todas as aulas do mesmo curso para identificar o índice
        const { data: todasAulas } = await supabase
          .from("aulas")
          .select("id, curso_id")
          .eq("curso_id", aulaData.curso_id);

        const index = todasAulas.findIndex((a) => a.id === aulaData.id);
        setIndice(index + 1); // Índice começa em 0, então somamos 1
        setAulas(todasAulas);
      }
    };

    fetchAula();
  }, [id]);

  const getYoutubeEmbedUrl = (url) => {
    const match = url.match(
      /(?:https?:\/\/)?(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-]+)/
    );
    return match ? `https://www.youtube.com/embed/${match[1]}` : "";
  };

  const handleNext = () => {
    if (indice < aulas.length) {
      navigate(`/aula/${aulas[indice]?.id}`);
    }
  };

  const handlePrev = () => {
    if (indice > 1) {
      navigate(`/aula/${aulas[indice - 2]?.id}`);
    }
  };

  return (
    <div className={styles.container}>
      {aula ? (
        <>
          <h2 className={styles.titulo}>Aula {indice}</h2>
          <div className={styles.videoWrapper}>
            <iframe
              src={getYoutubeEmbedUrl(aula.link)}
              title="Vídeo da aula"
              allowFullScreen
              className={styles.video}
            ></iframe>
          </div>

          <div className={styles.botoes}>
            <button
              onClick={handlePrev}
              disabled={indice === 1}
              className={styles.botao}
            >
              Aula Anterior
            </button>
            <button
              onClick={handleNext}
              disabled={indice === aulas.length}
              className={styles.botao}
            >
              Próxima Aula
            </button>
          </div>
        </>
      ) : (
        <p>Carregando aula...</p>
      )}
    </div>
  );
}
