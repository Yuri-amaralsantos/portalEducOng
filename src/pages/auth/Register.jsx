import { useState } from "react";
import { supabase } from "../../supabaseClient";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/Auth.module.css";

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
      { email, password }
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
        data_nascimento: dataNascimento,
        cargo: "cliente",
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
    <div className={styles.container}>
      <form onSubmit={handleRegister} className={styles.form}>
        <h1>Registrar</h1>
        <label>Nome:</label>
        <input
          type="text"
          className={styles.input}
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome"
          required
        />
        <label>Data de nascimento:</label>
        <input
          type="text"
          className={styles.input}
          value={dataNascimento || ""}
          onChange={(e) => {
            let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não for número

            let day = value.slice(0, 2);
            let month = value.slice(2, 4);
            let year = value.slice(4, 8);

            // Limita o dia para no máximo 31
            if (parseInt(day) > 31) day = "31";

            // Limita o mês para no máximo 12
            if (parseInt(month) > 12) month = "12";

            let finalValue = day;
            if (month) finalValue += "/" + month;
            if (year) finalValue += "/" + year;

            setDataNascimento(finalValue);
          }}
          placeholder="Dia/Mês/Ano"
          maxLength={10}
          required
        />
        <label>Email:</label>
        <input
          type="email"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <label>Senha:</label>
        <input
          type="password"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
          required
        />
        <button type="submit" className={styles.button}>
          Registrar
        </button>
        {message && <p className="link">{message}</p>}
        <p className={styles.link}>
          Já tem uma conta? <a href="/">Entrar</a>
        </p>
      </form>
    </div>
  );
}
