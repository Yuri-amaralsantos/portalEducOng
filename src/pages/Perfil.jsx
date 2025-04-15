import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ptBR from "date-fns/locale/pt-BR";

registerLocale("pt-BR", ptBR);

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
        setDataNascimento(new Date(data.data_nascimento));
      }
    };

    getPerfil();
  }, []);

  const handleSalvar = async () => {
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData?.user?.id;
    if (!userId || !dataNascimento) return;

    const perfilData = {
      id: userId,
      nome,
      data_nascimento: dataNascimento.toISOString().split("T")[0],
    };

    const { error } = await supabase
      .from("perfis")
      .update(perfilData)
      .eq("id", userId);

    if (error) {
      console.error("Erro ao salvar perfil:", error.message);
      setMensagem("Erro ao salvar perfil.");
    } else {
      setPerfil({ ...perfilData }); // atualiza estado
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
      setDataNascimento(new Date(perfil.data_nascimento));
    }
    setModoEdicao(false);
    setMensagem("");
  };

  return (
    <div>
      <h2>Perfil</h2>

      {modoEdicao ? (
        <>
          <div>
            <label>Nome:</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          <div>
            <label>Data de nascimento:</label>
            <DatePicker
              selected={dataNascimento}
              onChange={(date) => setDataNascimento(date)}
              dateFormat="dd/MM/yyyy"
              locale="pt-BR"
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              placeholderText="Selecione a data"
            />
          </div>

          <button onClick={handleSalvar}>Atualizar perfil</button>
          {perfil && <button onClick={handleCancelar}>Cancelar</button>}
        </>
      ) : perfil ? (
        <>
          <ul>
            <li>
              <strong>Nome:</strong> {perfil.nome}
            </li>
            <li>
              <strong>Data de nascimento:</strong>{" "}
              {new Date(perfil.data_nascimento).toLocaleDateString("pt-BR")}
            </li>
            <li>
              <strong>Idade:</strong> {calcularIdade(perfil.data_nascimento)}
            </li>
          </ul>
          <button onClick={handleEditar}>Editar Perfil</button>
        </>
      ) : (
        <p>Carregando perfil...</p>
      )}

      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}
