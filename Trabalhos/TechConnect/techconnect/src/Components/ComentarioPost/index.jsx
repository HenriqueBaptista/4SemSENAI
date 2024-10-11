import React, { useContext, useEffect, useState } from "react";
import { IoMdTrash } from "react-icons/io";
import PerfilImg from "../../Assets/Images/image 5.png";
import context from "../../Context/userContext";

export const ComentarioPost = ({ postId }) => {
  const [comentario, setComentario] = useState([]);
  const { user } = useContext(context);

  const deletarComentario = (id) => {
    fetch(`http://localhost:3000/comentario/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          console.log("Comentário deletado com sucesso!");
          // Atualiza o estado local removendo o comentário deletado
          setComentario((prevComentarios) =>
            prevComentarios.filter((comentario) => comentario.id !== id)
          );
        } else {
          console.log("Erro ao deletar comentário!");
        }
      })
      .catch(() => {
        console.log("Erro ao tentar deletar o comentário!");
      });
  };

  const getComentarioByPostId = () => {
    return fetch(`http://localhost:3000/comentario?postId=${postId}`)
      .then((response) => response.json())
      .then((response) => {
        if (response.length > 0) {
          setComentario(response);
        } else {
          console.log("Não foi possível encontrar os comentários!");
        }
      })
      .catch(() => {
        console.log("Erro ao buscar os comentários!");
      });
  };

  useEffect(() => {
    getComentarioByPostId();
  }, [postId]);

  // useEffect(() => {
  //   getComentarioByPostId();
  // }, [comentario]);


  return (
    <div>
      {comentario.map((comentario) => (
        <div key={comentario.id} className="flex mt-6">
          <img
            src={comentario.imagem}
            alt="Imagem do usuário"
            className="w-10 h-10 rounded-full"
          />
          <div className="flex flex-col gap-1 w-full h-full text-left ml-2">
            <p className="text-primary-white font-Poppins font-bold text-xs lg:text-sm">
              {comentario.userName}
            </p>
            <p className="text-primary-white font-Poppins font-normal text-xs lg:text-sm">
              {comentario.descricao}
            </p>
          </div>
          {comentario.userId === user.id && (
            <button onClick={() => deletarComentario(comentario.id)}>
              <IoMdTrash size={25} color="white" />
            </button>
          )}
        </div>
      ))}
    </div>
  );
};
