import React, { useContext, useEffect, useState } from "react";
import Header from "../../Components/Header";
import Menu from "../../Components/Menu";
import { ButtonMenu } from "../../Components/Button";
import Aside from "../../Components/Aside";
import PublicationForm from "../../Components/ModalPublicacao";
import { CardPost } from "../../Components/CardPost";
import { LastAccessCard } from "../../Components/LastAccessCard";

import context from "../../Context/userContext"

// tela home (geral)
export const Home = () => {
  const [selected, setSelected] = useState("home"); // seleção de telas

  const { user } = useContext(context);

  return (
    <div className="flex flex-col overflow-x-hidden overflow-y-auto h-screen w-screen bg-primary-black items-center">
      <Header username={user.login} image={user.imagem} />

      <body className="flex justify-center overflow-x-hidden w-screen h-screen mt-28">
        <section className="flex w-screen h-screen items-start overflow-x-hidden bg-primary-black">
          <Aside selected={selected} setSelected={setSelected} />

          <div className="flex w-screen overflow-x-hidden bg-primary-black">
            {
              // Se for selecionada a sessão home
              selected === "home" ?
                <div className="flex flex-col overflow-x-hidden">
                  <CardPost/>
                </div>
                :
                // Se for selecionada a sessão curtidas

                selected === "curtidas" ?
                  <div className="flex flex-col overflow-x-hidden">
                    <CardPost />

                  </div>
                  :
                  // Se for selecionada a sessão comentadas
                  selected === "comentadas" ?
                    <div className="flex flex-col overflow-x-hidden">
                      <CardPost />


                    </div>
                    :
                    // Se for selecionada a sessão acessos  
                    selected === "acessos" ?
                      <div className="flex flex-wrap overflow-x-hidden justify-center mb-24 bg-primary-black  w-screen lg:ml-72 gap-14 lg:mr-72 scroll-smooth">
                        <LastAccessCard />

                      </div>
                      :
                      ""
            }
          </div>
        </section>

        <PublicationForm idUsuario={user.id} />
      </body>
    </div>
  );
};
