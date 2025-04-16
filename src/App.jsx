import { Routes, Route, Navigate } from "react-router-dom";
import AuthRedirect from "./components/AuthRedirect";
import ProtectedLayout from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Perfil from "./pages/Perfil";
import CursosList from "./pages/CursoListPage";
import CursoView from "./pages/CursoView";
import AulaView from "./pages/AulaView";
import Admin from "./pages/Admin";
import QuestoesList from "./pages/QuestoesListPage";
import ResponderQuestao from "./pages/ResponderQuestao";
import QuestaoForm from "./pages/QuestaoForm";
import CursoForm from "./pages/CursoForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthRedirect />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Layout protegido com Navbar */}
      <Route element={<ProtectedLayout />}>
        <Route path="/home" element={<Home />} />
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
