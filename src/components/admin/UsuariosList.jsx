import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import styles from "./Admin.module.css";

export default function UsuariosList() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      const { data, error } = await supabase
        .from("perfis")
        .select("id, nome, cargo");

      if (error) {
        console.error("Erro ao buscar usuários:", error);
        return;
      }

      setUsuarios(data); // ← aqui estava o erro
    };
    fetchUsuarios();
  }, []);

  const alterarCargo = async (userId, novoCargo) => {
    const { error } = await supabase
      .from("perfis")
      .update({ cargo: novoCargo })
      .eq("id", userId);

    if (error) {
      alert("Erro ao alterar cargo");
      return;
    }

    setUsuarios((prev) =>
      prev.map((usuario) =>
        usuario.id === userId ? { ...usuario, cargo: novoCargo } : usuario
      )
    );
  };

  return (
    <div className={styles.container}>
      <h3>Lista de Usuários</h3>
      <div className={styles.userList}>
        {usuarios.map((usuario) => (
          <div key={usuario.id} className={styles.card}>
            <div>
              <h4>{usuario.nome}</h4>
              <p>Cargo: {usuario.cargo}</p>
            </div>
            <select
              value={usuario.cargo}
              onChange={(e) => alterarCargo(usuario.id, e.target.value)}
              className={styles.selectCargo}
            >
              <option value="cliente">Cliente</option>
              <option value="admin">Admin</option>
              <option value="moderador">Moderador</option>
              <option value="cancelado">Cancelado</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}
