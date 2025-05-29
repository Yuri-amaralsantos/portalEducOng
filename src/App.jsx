import { Routes, Route, Navigate } from "react-router-dom";
import AuthRedirect from "./components/auth/AuthRedirect";
import ProtectedLayout from "./components/ProtectedRoute";
import AdminRoute from "./components/admin/AdminRoute";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import Perfil from "./pages/Perfil";
import CursosList from "./pages/cursos/CursoListPage";
import CursoView from "./pages/cursos/CursoView";
import AulaView from "./pages/cursos/AulaView";
import QuestoesList from "./pages/questoes/QuestoesListPage";
import ResponderQuestao from "./pages/questoes/ResponderQuestao";
import QuestaoForm from "./pages/admin/QuestaoForm";
import CursoForm from "./pages/admin/CursoForm";
import Admin from "./pages/admin/Admin";
import Sobre from "./pages/sobre/Sobre";
import Jogo from "./pages/jogos/jogo";
import JogosList from "./pages/jogos/listaJogos";
import Privacidade from "./pages/sobre/Privacidade";
import PublicLayout from "./components/PublicLayout";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthRedirect />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Layout com Navbar, visível para todos */}
      <Route element={<PublicLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/privacidade" element={<Privacidade />} />
        <Route path="/cursos" element={<CursosList />} />
        <Route path="/curso/:id" element={<CursoView />} />
        <Route path="/aula/:id" element={<AulaView />} />
        <Route path="/questoes" element={<QuestoesList />} />
        <Route path="/questao/:id" element={<ResponderQuestao />} />
        <Route path="/questao/:nova" element={<ResponderQuestao />} />
        <Route path="/jogos" element={<JogosList />} />
        <Route path="/jogos/:id" element={<Jogo />} />
      </Route>

      {/* Rotas protegidas (exigem login) */}
      <Route element={<ProtectedLayout />}>
        <Route path="/perfil" element={<Perfil />} />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/curso/novo"
          element={
            <AdminRoute>
              <CursoForm />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/curso/:id"
          element={
            <AdminRoute>
              <CursoForm />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/questao/novo"
          element={
            <AdminRoute>
              <QuestaoForm />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/questao/:id"
          element={
            <AdminRoute>
              <QuestaoForm />
            </AdminRoute>
          }
        />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
