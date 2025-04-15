import { Routes, Route, Navigate } from "react-router-dom";
import AuthRedirect from "./components/AuthRedirect";
import ProtectedLayout from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Perfil from "./pages/Perfil";
import CursosList from "./pages/CursoList";
import CursoForm from "./pages/CursoForm";
import CursoView from "./pages/CursoView";
import AulaView from "./pages/AulaView";
import Admin from "./pages/Admin";
import QuestoesList from "./pages/QuestoesList";
import ResponderQuestao from "./pages/ResponderQuestao";

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
        <Route path="/cursos/novo" element={<CursoForm />} />
        <Route path="/cursos/:id" element={<CursoForm />} />
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
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
