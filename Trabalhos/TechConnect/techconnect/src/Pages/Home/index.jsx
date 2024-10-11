import React, { useContext, useEffect, useState } from "react";
import { Header } from "../../Components/Header";
import Aside from "../../Components/Aside";
import PublicationForm from "../../Components/ModalPublicacao";
import { CardPost } from "../../Components/CardPost";
import { LastAccessCard } from "../../Components/LastAccessCard";
import context from "../../Context/userContext";

export const Home = () => {
  const [selected, setSelected] = useState("home"); // seleção de telas
  const [listCurtidas, setListCurtidas] = useState([]) // lista de curtidas
  const quantidadeCurtidas = listCurtidas.length; // tamanho do número de curtidas
  const { user } = useContext(context);

  useEffect(() => {
    console.log(selected);
  }, [selected]);

  return (
    <main className="flex flex-col h-screen w-screen bg-primary-black">
      <Header />

      <body className="flex justify-center w-screen h-screen my-20 ">
        <section className="flex w-screen h-screen items-start bg-primary-black">

          <Aside selected={selected} setSelected={setSelected} />

          <div className="flex w-screen  bg-primary-black">
            {
              selected === "acessos" ? (
                <div className="flex flex-wrap justify-center mb-24 bg-primary-black  w-screen lg:ml-72 gap-14 lg:mr-72 scroll-smooth mt-28">
                  <LastAccessCard />
                </div>
              ) : (
                <div className="flex flex-col">
                  <CardPost
                    list={listCurtidas}
                    setList={setListCurtidas}
                    quantidadeCurtida={quantidadeCurtidas}
                    selected={selected}
                  />
                </div>
              )
            }
          </div>
        </section>

        <PublicationForm
          idUsuario={user.id}
        />
      </body>
    </main>
  );
};
