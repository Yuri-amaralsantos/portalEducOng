import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import styles from "../styles/Profile.module.css";

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
  const [dataNascimento, setDataNascimento] = useState(null);
  const [mensagem, setMensagem] = useState("");
  const [modoEdicao, setModoEdicao] = useState(false);

  useEffect(() => {
    const getPerfil = async () => {
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData?.user?.id;

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
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData?.user?.id;
    if (!userId || !dataNascimento) return;

    const [dia, mes, ano] = dataNascimento.split("/");
    const isoDate = `${ano}-${mes.padStart(2, "0")}-${dia.padStart(2, "0")}`;

    const perfilData = {
      id: userId,
      nome,
      data_nascimento: isoDate,
    };

    const { error } = await supabase
      .from("perfis")
      .update(perfilData)
      .eq("id", userId);

    if (error) {
      console.error("Erro ao salvar perfil:", error.message);
      setMensagem("Erro ao salvar perfil.");
    } else {
      setPerfil({ ...perfilData });
      setMensagem("Perfil atualizado com sucesso!");
      setModoEdicao(false);
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
    <div className={styles.perfilContainer}>
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
