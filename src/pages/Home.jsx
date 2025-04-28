import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function Home() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);
      } else {
        navigate("/"); // Redireciona se não estiver logado
      }
    };

    getUser();
  }, []);

  return (
    <div className="container">
      <h2>Página Inicial</h2>
      {user && <p>Bem-vindo, {user.email}!</p>}
    </div>
  );
}
