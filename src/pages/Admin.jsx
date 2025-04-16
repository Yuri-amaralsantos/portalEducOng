// pages/Administracao.jsx
import Tabs from "../components/Tabs";
import CursosList from "../components/CursoList";
import QuestoesList from "../components/QuestoesList";

export default function Administracao() {
  const tabs = [
    { label: "Cursos", content: <CursosList /> },
    { label: "Questões", content: <QuestoesList /> },
  ];

  return (
    <div>
      <h2>Administração</h2>
      <hr />
      <Tabs tabs={tabs} />
    </div>
  );
}
