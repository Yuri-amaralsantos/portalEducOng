import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import styles from "./Profile.module.css";

function calcularIdade(dataNascimento) {
  const nascimento = new Date(dataNascimento);
  const hoje = new Date();
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const m = hoje.getMonth() - nascimento.getMonth();
  if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
    idade--;
  }
  return idade;
}

export default function Perfil() {
  const [perfil, setPerfil] = useState(null);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [dataNascimento, setDataNascimento] = useState(null);
  const [mensagem, setMensagem] = useState("");
  const [modoEdicao, setModoEdicao] = useState(false);

  useEffect(() => {
    const getPerfil = async () => {
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData?.user?.id;
      setEmail(userData?.user?.email);

      if (!userId) return;

      const { data, error } = await supabase
        .from("perfis")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.log("Erro ao buscar perfil:", error.message);
      } else if (!data) {
        console.log("Perfil não encontrado.");
        setPerfil(null);
      } else {
        setPerfil(data);
        setNome(data.nome);
        setDataNascimento(
          new Date(data.data_nascimento).toLocaleDateString("pt-BR")
        );
      }
    };

    getPerfil();
  }, []);

  const handleSalvar = async () => {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    const user = userData?.user;
    const userId = user?.id;

    if (!userId) {
      setMensagem("Usuário inválido.");
      return;
    }

    if (novaSenha && novaSenha !== confirmarSenha) {
      setMensagem("As senhas não coincidem.");
      return;
    }

    // Constrói dados a serem atualizados no perfil
    const updatesPerfil = {};
    if (nome && nome !== perfil?.nome) updatesPerfil.nome = nome;
    if (dataNascimento) {
      const [dia, mes, ano] = dataNascimento.split("/");
      if (dia && mes && ano) {
        const isoDate = `${ano}-${mes.padStart(2, "0")}-${dia.padStart(
          2,
          "0"
        )}`;
        if (isoDate !== perfil?.data_nascimento) {
          updatesPerfil.data_nascimento = isoDate;
        }
      }
    }

    // Atualiza o perfil apenas se houver mudanças
    let perfilError = null;
    if (Object.keys(updatesPerfil).length > 0) {
      const { error } = await supabase
        .from("perfis")
        .update(updatesPerfil)
        .eq("id", userId);
      perfilError = error;
    }

    // Prepara alterações de autenticação
    const updatesAuth = {};
    if (email && email !== user.email) updatesAuth.email = email;
    if (novaSenha) updatesAuth.password = novaSenha;

    let authError = null;
    if (Object.keys(updatesAuth).length > 0) {
      const { error } = await supabase.auth.updateUser(updatesAuth);
      authError = error;
    }

    if (perfilError || authError) {
      console.error("Erro ao salvar perfil:", perfilError || authError);
      setMensagem("Erro ao salvar perfil.");
    } else {
      setMensagem("Perfil atualizado com sucesso!");
      setModoEdicao(false);
      setNovaSenha("");
      setConfirmarSenha("");

      // Atualiza localmente somente os campos alterados
      setPerfil((prev) => ({
        ...prev,
        ...updatesPerfil,
      }));
    }
  };

  const handleEditar = () => {
    setModoEdicao(true);
  };

  const handleCancelar = () => {
    if (perfil) {
      setNome(perfil.nome);
      setDataNascimento(
        new Date(perfil.data_nascimento).toLocaleDateString("pt-BR")
      );
    }
    setModoEdicao(false);
    setMensagem("");
  };

  return (
    <div className="container">
      <div className={styles.perfilCpa}></div>

      <div className={styles.perfilInfo}>
        {modoEdicao ? (
          <div className={styles.perfilEdicao}>
            <div>
              <label>Nome:</label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>Data de Nascimento:</label>
            <input
              type="text"
              className={styles.input}
              value={dataNascimento}
              onChange={(e) => {
                let value = e.target.value.replace(/\D/g, ""); // Remove não dígitos

                let day = value.slice(0, 2);
                let month = value.slice(2, 4);
                let year = value.slice(4, 8);

                if (parseInt(day) > 31) day = "31";
                if (parseInt(month) > 12) month = "12";

                let finalValue = day;
                if (month) finalValue += "/" + month;
                if (year) finalValue += "/" + year;

                setDataNascimento(finalValue);
              }}
              placeholder="DD/MM/AAAA"
              maxLength={10}
            />
            <div>
              <label>Nova senha:</label>
              <input
                type="password"
                value={novaSenha}
                onChange={(e) => setNovaSenha(e.target.value)}
              />
            </div>
            <div>
              <label>Confirmar senha:</label>
              <input
                type="password"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
              />
            </div>
            <button onClick={handleSalvar}>Atualizar perfil</button>
            <button onClick={handleCancelar}>Cancelar</button>
          </div>
        ) : perfil ? (
          <>
            <h2>{perfil.nome}</h2>
            <p>
              <strong>Data de nascimento:</strong>{" "}
              {new Date(perfil.data_nascimento).toLocaleDateString("pt-BR")}
            </p>
            <p>
              <strong>Idade:</strong> {calcularIdade(perfil.data_nascimento)}
            </p>
            <button onClick={handleEditar}>Editar Perfil</button>
          </>
        ) : (
          <p>Carregando perfil...</p>
        )}

        {mensagem && <p className="mensagem">{mensagem}</p>}
      </div>
    </div>
  );
}
