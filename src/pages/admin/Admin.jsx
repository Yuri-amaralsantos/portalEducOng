// pages/Administracao.jsx
import Tabs from "../../components/admin/Tabs";
import CursosList from "../../components/admin/CursoList";
import QuestoesList from "../../components/admin/QuestoesList";

export default function Administracao() {
  const tabs = [
    { label: "Cursos", content: <CursosList /> },
    { label: "Questões", content: <QuestoesList /> },
  ];

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Administração</h2>

      <Tabs tabs={tabs} />
    </div>
  );
}
