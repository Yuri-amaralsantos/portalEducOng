import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function AulaView() {
  const { id } = useParams();
  const [aula, setAula] = useState(null);

  useEffect(() => {
    const fetchAula = async () => {
      const { data } = await supabase
        .from("aulas")
        .select("*")
        .eq("id", id)
        .single();
      setAula(data);
    };

    fetchAula();
  }, [id]);

  const getYoutubeEmbedUrl = (url) => {
    const match = url.match(
      /(?:https?:\/\/)?(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-]+)/
    );
    return match ? `https://www.youtube.com/embed/${match[1]}` : "";
  };

  return (
    <div>
      {aula ? (
        <>
          <h2>{aula.nome}</h2>
          <iframe
            width="560"
            height="315"
            src={getYoutubeEmbedUrl(aula.link)}
            title="YouTube video"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </>
      ) : (
        <p>Carregando aula...</p>
      )}
    </div>
  );
}
