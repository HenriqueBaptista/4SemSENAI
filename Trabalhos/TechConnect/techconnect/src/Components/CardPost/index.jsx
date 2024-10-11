import React, { useContext, useEffect, useState } from "react";
import { RiHeart3Line } from "react-icons/ri";
import { IoIosArrowDown, IoMdTrash } from "react-icons/io";
import { InputHome } from "../Input";
import { IoSend } from "react-icons/io5";
import { v4 as uuid } from "uuid";
import context from "../../Context/userContext";
import { AiFillHeart } from "react-icons/ai";
import { ComentarioPost } from "./../ComentarioPost/index";

export const CardPost = ({
  selected
}) => {
  const [likesCount, setLikesCount] = useState({}); // Armazena contador de curtidas por ID de publicação
  // Cria um estado para curtidas baseado no ID da publicação
  const [likes, setLikes] = useState({});

  const { user } = useContext(context);
  const [comentario, setComentario] = useState("");
  const [publicacao, setPublicacao] = useState([]);
  const [publicacaoComentario, setPublicacaoComentario] = useState([]);
  const [publicacaoLike, setPublicacaoLike] = useState([]);
  const [likedPosts, setLikedPosts] = useState(new Set()); // Para controlar quais posts foram curtidos
  const [comentarioInputs, setComentarioInputs] = useState({});
  const [comentariosVisiveis, setComentariosVisiveis] = useState({});
  const [mensagemErro, setMensagemErro] = useState({});

  const [arrayLikes, setArrayLikes] = useState([]);
  const likeslength = arrayLikes.length;

  const formatDate = (dateString) => {
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    return new Date(dateString).toLocaleString("pt-BR", options);
  };
  const handleInputChange = (postId, value) => {
    setComentarioInputs((prevState) => ({
      ...prevState,
      [postId]: value,
    }));
    setMensagemErro((prevState) => ({
      ...prevState,
      [postId]: "", // Limpa a mensagem de erro ao digitar no campo
    }));
  };

  const PostComentario = async (e, postId) => {
    e.preventDefault();

    if (!comentarioInputs[postId] || comentarioInputs[postId].trim() === "") {
      setMensagemErro((prevState) => ({
        ...prevState,
        [postId]: "Comentário deve conter algum valor!",
      }));
      return;
    }

    const comentarioData = {
      id: uuid(),
      postId: postId,
      userId: user.id,
      userName: user.name,
      descricao: comentarioInputs[postId],
      imagem: user.imagem,
      userName: user.nome,
    };

    await fetch("http://localhost:3000/comentario", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(comentarioData),
    });

    setComentarioInputs((prevState) => ({
      ...prevState,
      [postId]: "", // Limpa o input do comentário para o post específico
    }));
  };

  const ShowComentariosVisiveis = (postId) => {
    setComentariosVisiveis((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId],
    }));
  };

  useEffect(() => {
    console.log("asd");
  }, [comentario, comentariosVisiveis]);

  const getPosts = () => {
    return fetch("http://localhost:3000/publicacao")
      .then((response) => response.json())
      .then((response) => {
        if (response.length > 0) {
          setPublicacao(response);

          // Verifica as curtidas do usuário para cada postagem
          checkUserLikes(response);

          checkLikesCount(response); // Verifica o número total de curtidas
        }
      })
      .catch(() => {
        console.log("Não foi possível encontrar a publicação!!! CATCH");
      });
  };

  useEffect(() => {
    getPosts();
  }, []);

  // Função para verificar o número total de curtidas para cada postagem
  const checkLikesCount = async (posts) => {
    const totalLikes = {};
    for (let post of posts) {
      const response = await fetch(
        `http://localhost:3000/curtida?publicacao=${post.id}`
      );
      const data = await response.json();
      totalLikes[post.id] = data.length; // Armazena o número total de curtidas
    }
    setLikesCount(totalLikes); // Atualiza o estado do contador de curtidas
  };

  const [curtida, setCurtida] = useState({
    publicacao: "",
    usuario_id: "",
  });

  const [isLiked, setIsLiked] = useState(false);

  // Função para verificar as curtidas do usuário
  const checkUserLikes = async (posts) => {
    const userLikes = {}; // Armazena as curtidas do usuário por postagem
    for (let post of posts) {
      const response = await fetch(
        `http://localhost:3000/curtida?publicacao=${post.id}&usuario_id=${user.id}`
      );
      const data = await response.json();
      if (data.length > 0) {
        userLikes[post.id] = true; // Se o usuário já curtiu, marca como true
      } else {
        userLikes[post.id] = false; // Caso contrário, marca como false
      }
    }
    setLikes(userLikes); // Atualiza o estado de curtidas
  };

  const like = async (publicacaoId) => {
    console.log("Liking post: ", publicacaoId);
    try {
      const data = {
        publicacao: publicacaoId,
        id: uuid(),
        usuario_id: user.id,
      };

      await fetch("http://localhost:3000/curtida", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // Atualiza o estado de curtidas para essa postagem
      setLikes((prevLikes) => ({
        ...prevLikes,
        [publicacaoId]: true,
      }));

      setLikesCount((prevLikesCount) => ({
        ...prevLikesCount,
        [publicacaoId]: prevLikesCount[publicacaoId] + 1, // Incrementa o contador de curtidas
      }));

      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  // Função para encontrar a curtida de um usuário em uma publicação específica
  const findLike = async (publicacaoId) => {
    // const publicacaoId = await findPost(curtida.publicacao)
    return fetch(
      `http://localhost:3000/curtida?publicacao=${publicacaoId}&usuario_id=${user.id}`
    )
      .then((response) => response.json())
      .then((response) => (response.length > 0 ? response[0].id : null))

      .catch((error) => {
        console.log(error);
      });
  };

  const deleteLike = async (publicacaoId) => {
    console.log("Removing like for post: ", publicacaoId);
    //chama funcao de encontrar like
    const likeId = await findLike(publicacaoId);
    try {
      await fetch(`http://localhost:3000/curtida/${likeId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Atualiza o estado de curtidas para essa postagem
      setLikes((prevLikes) => ({
        ...prevLikes,
        [publicacaoId]: false,
      }));
      setLikesCount((prevLikesCount) => ({
        ...prevLikesCount,
        [publicacaoId]: prevLikesCount[publicacaoId] - 1, // Decrementa o contador de curtidas
      }));
      setIsLiked(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = (id) => {
    try {
      fetch(`http://localhost:3000/publicacao/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) { }
  };

  useEffect(() => {
    getPosts();
  }, [publicacao]);

  useEffect(() => {
    getCommentedPostsByUser();
    getLikedPostsByUser();
  }, [selected])


  // função para filtrar os posts com os comentários
  const getCommentedPostsByUser = async () => {
    try {
      let postsFiltrados = [];
      const postIds = new Set(); // Set para armazenar os IDs dos posts já adicionados

      const respose = await fetch(`http://localhost:3000/comentario?userId=${user.id}`);
      const data = await respose.json();

      for (const post of data) {
        const resposePost = await fetch(`http://localhost:3000/publicacao?id=${post.postId}`);
        const dataPost = await resposePost.json();

        // Verifica se o post já foi adicionado
        if (dataPost.length > 0 && !postIds.has(post.postId)) {
          postsFiltrados.push(dataPost[0]);
          postIds.add(post.postId); // Adiciona o ID do post ao Set
        }
      }

      setPublicacaoComentario(postsFiltrados);
    } catch (error) {
      console.log("Não foi possível filtrar os posts");
    }
  };

  const getLikedPostsByUser = async () => {
    try {
      let postsFiltrados = [];
      const postIds = new Set(); // Set para armazenar os IDs dos posts já adicionados

      const response = await fetch(`http://localhost:3000/curtida?usuario_id=${user.id}`);
      const data = await response.json();

      for (const post of data) {
        const responsePost = await fetch(`http://localhost:3000/publicacao?id=${post.publicacao}`); // Aqui foi corrigido
        const dataPost = await responsePost.json();

        // Verifica se o post já foi adicionado
        if (dataPost.length > 0 && !postIds.has(post.publicacao)) { // Aqui também foi corrigido
          postsFiltrados.push(dataPost[0]);
          postIds.add(post.publicacao); // Adiciona o ID do post ao Set
        }
      }

      setPublicacaoLike(postsFiltrados);
      console.log(postsFiltrados);
    } catch (error) {
      console.log("Não foi possível filtrar os posts");
    }
  };


  // TELAS
  // home
  if (selected === "home") {
    return (
      <section className="flex overflow-x-hidden flex-col w-screen bg-primary-black items-center">
        {publicacao
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Ordena do mais recente para o mais antigo
          .map((pub) => (
            <div key={pub.id} className="lg:w-[50%] overflow-x-hidden w-[80%] mb-20">
              <div className="flex">
                <img
                  className="w-14 h-14 border-0 rounded-full"
                  alt="img feed"
                  src={pub.userImage}
                />
                <div className="flex w-full justify-between">
                  <div className="flex items-start just flex-col ml-2">
                    <p className="text-primary-white w-[140px] font-Poppins font-bold">
                      {pub.nome}
                    </p>
                    <p className="text-complementary-blue text-leftfont-Poppins font-normal">
                      @{pub.username}
                    </p>
                  </div>
                  <p className="text-primary-white font-Poppins font-normal lg:text-xl text-sm lg:w-[180px] w-[135px] ml-[0px] mt-[5px] lg:ml-[360px] lg:mt-[5px]">
                    {formatDate(pub.createdAt)}
                  </p>
                  {pub.userId === user.id && (
                    <button className="lg:mt-[-20px] mt-[-25px] lg:mr-0 mr-14" onClick={() => deletePost(pub.id)}>
                      <IoMdTrash size={25} color="white" />
                    </button>
                  )}
                </div>
              </div >
              <div className="mt-5">
                {pub.image && (
                  <img
                    className="lg:h-auto h-auto lg:w-full object-cover rounded-3xl "
                    alt="publicação"
                    src={pub.image}
                  />
                )}
                <p className="text-primary-white font-Poppins lg:w-full break-words w-[340px] font-medium text-left mt-2 ml-2">
                  {pub.caption}
                </p>
              </div>
              <div className="flex gap-4 mt-2 items-center">
                <div className="relative w-full">
                  <InputHome
                    value={comentarioInputs[pub.id] || ""}
                    onChange={(e) => handleInputChange(pub.id, e.target.value)}
                  />
                  <button
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-full"
                    onClick={(e) => PostComentario(e, pub.id)}
                  >
                    <IoSend color="white" />
                  </button>
                </div >

                <p className="text-primary-white w-4 font-Poppins">
                  {likesCount[pub.id] || 0}
                </p>
                <button
                  onClick={() =>
                    likes[pub.id] ? deleteLike(pub.id) : like(pub.id)
                  }
                >
                  {likes[pub.id] ? (
                    <AiFillHeart size={25} color="red" />
                  ) : (
                    <RiHeart3Line size={25} color="white" />
                  )}
                </button>
              </div >

              {
                mensagemErro[pub.id] && (
                  <p className="font-Poppins font-medium text-center text-complementary-red my-4">
                    {mensagemErro[pub.id]}
                  </p>
                )
              }

              {comentariosVisiveis[pub.id] && <ComentarioPost postId={pub.id} />}
              <div className="flex flex-col items-center my-3 mt-5">
                <button
                  className="flex items-center text-complementary-blue font-Poppins font-normal"
                  onClick={() => ShowComentariosVisiveis(pub.id)}
                >
                  {comentariosVisiveis[pub.id]
                    ? "Ver menos comentários"
                    : "Ver comentários"}{" "}
                  <IoIosArrowDown color="#55AAF9" />
                </button>
              </div>
            </div >
          ))}
      </section >
    );
  }

  // curtidas
  else if (selected === "curtidas") {
    return (
      <section className="flex flex-col w-screen bg-primary-black items-center">
        {publicacaoLike
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Ordena do mais recente para o mais antigo
          .map((pub) => (
            <div key={pub.id} className="lg:w-[50%] w-[80%] mb-20">
              <div className="flex">
                <img
                  className="w-14 h-14 border-0 rounded-full"
                  alt="img feed"
                  src={pub.userImage}
                />
                <div className="flex w-full justify-between">
                  <div className="flex items-start just flex-col ml-2">
                    <p className="text-primary-white font-Poppins font-bold">
                      {pub.nome}
                    </p>
                    <p className="text-complementary-blue text-leftfont-Poppins font-normal">
                      @{pub.username}
                    </p>
                  </div>
                  <p className="text-primary-white font-Poppins font-normal lg:ml-[400px] lg:mt-[5px]">
                    {formatDate(pub.createdAt)}
                  </p>
                  {pub.userId === user.id && (
                    <button className="mt-[-24px]" onClick={() => deletePost(pub.id)}>
                      <IoMdTrash size={25} color="white" />
                    </button>
                  )}
                </div>
              </div >
              <div className="mt-5">
                {pub.image && (
                  <img
                    className="lg:h-auto h-auto lg:w-full object-cover rounded-3xl "
                    alt="publicação"
                    src={pub.image}
                  />
                )}
                <p className="text-primary-white font-Poppins font-medium text-left mt-2 ml-2">
                  {pub.caption}
                </p>
              </div>
              <div className="flex gap-4 mt-2 items-center">
                <div className="relative w-full">
                  <InputHome
                    value={comentarioInputs[pub.id] || ""}
                    onChange={(e) => handleInputChange(pub.id, e.target.value)}
                  />
                  <button
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-full"
                    onClick={(e) => PostComentario(e, pub.id)}
                  >
                    <IoSend color="white" />
                  </button>
                </div >

                <p className="text-primary-white w-4 font-Poppins">
                  {likesCount[pub.id] || 0}
                </p>
                <button
                  onClick={() =>
                    likes[pub.id] ? deleteLike(pub.id) : like(pub.id)
                  }
                >
                  {likes[pub.id] ? (
                    <AiFillHeart size={25} color="red" />
                  ) : (
                    <RiHeart3Line size={25} color="white" />
                  )}
                </button>
              </div >

              {
                mensagemErro[pub.id] && (
                  <p className="font-Poppins font-medium text-center text-complementary-red my-4">
                    {mensagemErro[pub.id]}
                  </p>
                )
              }

              {comentariosVisiveis[pub.id] && <ComentarioPost postId={pub.id} />}
              <div className="flex flex-col items-center my-3 mt-5">
                <button
                  className="flex items-center text-complementary-blue font-Poppins font-normal"
                  onClick={() => ShowComentariosVisiveis(pub.id)}
                >
                  {comentariosVisiveis[pub.id]
                    ? "Ver menos comentários"
                    : "Ver comentários"}{" "}
                  <IoIosArrowDown color="#55AAF9" />
                </button>
              </div>
            </div >
          ))}
      </section >
    );
  }

  // comentadas
  else if (selected === "comentadas") {
    return (
      <section className="flex flex-col w-screen bg-primary-black items-center">
        {publicacaoComentario
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Ordena do mais recente para o mais antigo
          .map((pub) => (
            <div key={pub.id} className="lg:w-[50%] w-[80%] mb-20">
              <div className="flex">
                <img
                  className="w-14 h-14 border-0 rounded-full"
                  alt="img feed"
                  src={pub.userImage}
                />
                <div className="flex w-full justify-between">
                  <div className="flex items-start just flex-col ml-2">
                    <p className="text-primary-white font-Poppins font-bold">
                      {pub.nome}
                    </p>
                    <p className="text-complementary-blue text-leftfont-Poppins font-normal">
                      @{pub.username}
                    </p>
                  </div>
                  <p className="text-primary-white font-Poppins font-normal mt-[-10px] lg:ml-[400px] lg:mt-[5px]">
                    {formatDate(pub.createdAt)}
                  </p>
                  {pub.userId === user.id && (
                    <button className="mt-[-24px]" onClick={() => deletePost(pub.id)}>
                      <IoMdTrash size={25} color="white" />
                    </button>
                  )}
                </div>
              </div >
              <div className="mt-5">
                {pub.image && (
                  <img
                    className="lg:h-auto h-auto lg:w-full object-cover rounded-3xl "
                    alt="publicação"
                    src={pub.image}
                  />
                )}
                <p className="text-primary-white font-Poppins font-medium text-left mt-2 ml-2">
                  {pub.caption}
                </p>
              </div>
              <div className="flex gap-4 mt-2 items-center">
                <div className="relative w-full">
                  <InputHome
                    value={comentarioInputs[pub.id] || ""}
                    onChange={(e) => handleInputChange(pub.id, e.target.value)}
                  />
                  <button
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-full"
                    onClick={(e) => PostComentario(e, pub.id)}
                  >
                    <IoSend color="white" />
                  </button>
                </div >

                <p className="text-primary-white w-4 font-Poppins">
                  {likesCount[pub.id] || 0}
                </p>
                <button
                  onClick={() =>
                    likes[pub.id] ? deleteLike(pub.id) : like(pub.id)
                  }
                >
                  {likes[pub.id] ? (
                    <AiFillHeart size={25} color="red" />
                  ) : (
                    <RiHeart3Line size={25} color="white" />
                  )}
                </button>
              </div >

              {
                mensagemErro[pub.id] && (
                  <p className="font-Poppins font-medium text-center text-complementary-red my-4">
                    {mensagemErro[pub.id]}
                  </p>
                )
              }

              {comentariosVisiveis[pub.id] && <ComentarioPost postId={pub.id} />}
              <div className="flex flex-col items-center my-3 mt-5">
                <button
                  className="flex items-center text-complementary-blue font-Poppins font-normal"
                  onClick={() => ShowComentariosVisiveis(pub.id)}
                >
                  {comentariosVisiveis[pub.id]
                    ? "Ver menos comentários"
                    : "Ver comentários"}{" "}
                  <IoIosArrowDown color="#55AAF9" />
                </button>
              </div>
            </div >
          ))}
      </section >
    );
  }

  // se não for nenhuma das 3
  else {
    return (
      <>

      </>
    )
  }

};
