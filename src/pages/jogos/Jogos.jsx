import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";

export default function Jogos() {
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
      <iframe
        src="https://yuri-amaralsantos.itch.io/educationmathgame"
        width="800"
        height="600"
        frameborder="0"
        allowfullscreen
      ></iframe>
    </div>
  );
}
