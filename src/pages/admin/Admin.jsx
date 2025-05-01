import Tabs from "../../components/admin/Tabs";
import CursosList from "../../components/admin/CursoList";
import QuestoesList from "../../components/admin/QuestoesList";
import UsuariosList from "../../components/admin/UsuariosList"; // Importando o novo componente

export default function Administracao() {
  const tabs = [
    { label: "Cursos", content: <CursosList /> },
    { label: "Questões", content: <QuestoesList /> },
    { label: "Usuários", content: <UsuariosList /> }, // Nova aba para usuários
  ];

  return (
    <div className="container">
      <h2>Administração</h2>

      <Tabs tabs={tabs} />
    </div>
  );
}
