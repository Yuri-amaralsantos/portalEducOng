import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import { useNavigate } from "react-router-dom";
import styles from "./Auth.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showResetBox, setShowResetBox] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const navigate = useNavigate();

  // Redireciona se já estiver logado
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate("/home");
    });
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setMessage(error.message);
    } else {
      navigate("/home");
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.resetPasswordForEmail(resetEmail);
    if (error) {
      setResetMessage(error.message);
    } else {
      setResetMessage("Email de recuperação enviado.");
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleLogin} className={styles.form}>
        <h1>Login</h1>
        <input
          type="email"
          className={styles.input}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className={styles.input}
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className={styles.button}>
          Entrar
        </button>
        {message && <p className={styles.link}>{message}</p>}
        <p className={styles.link}>
          Não tem conta? <a href="/register">Registrar</a>
        </p>
        <p className={styles.link}>
          <button
            type="button"
            onClick={() => setShowResetBox(true)}
            className={styles.buttonLink}
          >
            Esqueceu a senha?
          </button>
        </p>
      </form>
      {showResetBox && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalBox}>
            <h2>Recuperar Senha</h2>
            <form onSubmit={handlePasswordReset}>
              <input
                type="email"
                placeholder="Digite seu email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                required
                className={styles.input}
              />
              <button type="submit" className={styles.button}>
                Enviar
              </button>
              <button
                type="button"
                onClick={() => setShowResetBox(false)}
                className={styles.buttonSecondary}
              >
                Cancelar
              </button>
              {resetMessage && <p>{resetMessage}</p>}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
