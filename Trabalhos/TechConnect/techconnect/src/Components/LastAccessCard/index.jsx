import React, { useEffect, useState } from "react";

export const LastAccessCard = () => {

  const [usuarios, setUsuarios] = useState([])

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false };
    return new Date(dateString).toLocaleString('pt-BR', options);
  };

  const getUsers = () => {
    return fetch("http://localhost:3000/usuario")
      .then(response => response.json())
      .then(response => {
        if (response.length > 0) {
          setUsuarios(response);
        } else {
          console.log("Não foi possível encontrar os usuários!")
        }
      })
      .catch(() => {
        console.log("Não foi possível encontrar os usuários! CATCH")
      });
  };

  useEffect(() => {
    getUsers();
  }, [usuarios])



  return (
    <section>
      {usuarios.map((user) => (
        <div key={user.id} className="flex flex-col w-96  border-b-2 items-center gap-2 mb-10">

          <img
            className="w-14 h-14 border-0 rounded-full"
            alt="img feed"
            src={user.imagem}
          />

          <p className="text-primary-white font-Poppins font-bold">
            {user.login}
          </p>
          <p className="text-primary-white font-Poppins font-normal mb-3 text-center">
            Último acesso em {formatDate(user.ultimoAcesso)}
          </p>
        </div>
      ))}
    </section>
  );
};
