// pages/Administracao.jsx
import Tabs from "../components/Tabs";
import CursoPainel from "../components/CursoPainel";
import QuestaoPainel from "../components/QuestaoPainel";

export default function Administracao() {
  const tabs = [
    { label: "Cursos", content: <CursoPainel /> },
    { label: "Questões", content: <QuestaoPainel /> },
  ];

  return (
    <div>
      <h2>Administração</h2>
      <hr />
      <Tabs tabs={tabs} />
    </div>
  );
}
