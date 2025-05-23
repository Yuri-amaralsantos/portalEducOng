// src/pages/Jogos.jsx
import { jogos } from "./dataList";
import { useNavigate } from "react-router-dom";
import "./Jogos.css"; // Importe o CSS

export default function JogosList() {
  const navigate = useNavigate();

  return (
    <div className="jogos-container">
      <h1>Lista de Jogos</h1>
      <div className="jogos-grid">
        {jogos.map((jogo) => (
          <div
            className="jogo-card"
            key={jogo.id}
            onClick={() => navigate(`/jogos/${jogo.id}`)}
          >
            <img src={jogo.imagem} alt={jogo.nome} className="jogo-imagem" />
            <div className="jogo-info">
              <h3>{jogo.nome}</h3>
              <p>{jogo.descricao}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
