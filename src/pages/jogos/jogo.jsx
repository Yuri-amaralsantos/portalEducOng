// src/pages/JogoDetalhe.jsx
import { useParams, useNavigate } from "react-router-dom";
import { jogos } from "./dataList";
import { useEffect } from "react";

export default function Jogo() {
  const { id } = useParams();
  const jogo = jogos.find((j) => j.id === id);
  const navigate = useNavigate();

  useEffect(() => {
    if (!jogo) navigate("/jogos"); // Redireciona se o jogo não existir
  }, [jogo]);

  if (!jogo) return null;

  return (
    <div className="container">
      <h1>{jogo.nome}</h1>
      <p>{jogo.descricao}</p>
      <iframe
        src={jogo.embedUrl}
        width="800"
        height="600"
        allowFullScreen
        title={jogo.nome}
      ></iframe>
    </div>
  );
}
