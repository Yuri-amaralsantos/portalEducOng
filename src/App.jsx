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
import Privacidade from "./pages/sobre/Privacidade";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthRedirect />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Layout protegido com Navbar */}
      <Route element={<ProtectedLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/privacidade" element={<Privacidade />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/cursos" element={<CursosList />} />
        <Route path="/curso/:id" element={<CursoView />} />
        <Route path="/aula/:id" element={<AulaView />} />
        <Route path="/questoes/" element={<QuestoesList />} />
        <Route path="/questao/:id" element={<ResponderQuestao />} />
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
