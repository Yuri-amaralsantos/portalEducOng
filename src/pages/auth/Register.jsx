import { useState } from "react";
import { supabase } from "../../supabaseClient";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";

registerLocale("pt-BR", ptBR);

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp(
      {
        email,
        password,
      }
    );

    if (signUpError) {
      setMessage(signUpError.message);
      return;
    }

    const userId = signUpData?.user?.id;

    if (userId && nome && dataNascimento) {
      const { error: perfilError } = await supabase.from("perfis").insert({
        id: userId,
        nome,
        data_nascimento: dataNascimento.toISOString().split("T")[0],
        cargo: "cliente", // padrão, se quiser
      });

      if (perfilError) {
        setMessage("Erro ao criar perfil: " + perfilError.message);
        return;
      }
    }

    setMessage("Cadastro realizado! Verifique seu email.");
    navigate("/");
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto" }}>
      <h2>Registrar</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome"
          required
        />
        <br />
        <label>Data de nascimento:</label>
        <DatePicker
          selected={dataNascimento}
          onChange={(date) => setDataNascimento(date)}
          dateFormat="dd/MM/yyyy"
          locale="pt-BR"
          placeholderText="Selecione a data"
          required
        />
        <br />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
          required
        />
        <br />
        <button type="submit">Registrar</button>
      </form>
      {message && <p>{message}</p>}
      <p>
        Já tem uma conta? <a href="/">Entrar</a>
      </p>
    </div>
  );
}
