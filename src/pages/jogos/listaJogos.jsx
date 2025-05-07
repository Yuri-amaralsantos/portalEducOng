// src/pages/Jogos.jsx
import { jogos } from "./dataList";
import { useNavigate } from "react-router-dom";

export default function JogosList() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>Lista de Jogos</h1>
      <div className="card">
        {jogos.map((jogo) => (
          <div
            key={jogo.id}
            onClick={() => navigate(`/jogos/${jogo.id}`)}
            style={{ cursor: "pointer", marginBottom: "20px" }}
          >
            <h3>{jogo.nome}</h3>
            <p>{jogo.descricao}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
