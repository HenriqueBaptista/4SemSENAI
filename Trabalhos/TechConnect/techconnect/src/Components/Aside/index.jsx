import React, { useContext } from "react";

import { BiHomeAlt2 } from "react-icons/bi";

import { RiHeart3Line } from "react-icons/ri";

import { IoChatbubbleOutline } from "react-icons/io5";

import { GoPerson } from "react-icons/go";

import { TfiPowerOff } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";
import context from "../../Context/userContext";


const Aside = ({ selected, setSelected }) => {
  // CONSTS
  const { user } = useContext(context)
  const navigate = useNavigate()



  // FUNCTIONS
  const logoutUser = () => {
    try {

      const data = {
        ...user,
        ultimoAcesso: new Date().toLocaleString()
      }

      fetch("http://localhost:3000/usuario/" + user.id, {
        method: "PUT",
        body: JSON.stringify(data)
      })

      navigate("/")

    } catch (error) {
      alert("Não foi possível registrar o seu acesso")
    }
  }

  return (
    <aside className="bg-primary-black flex lg:flex-col lg:p-0 lg:pr-0 pr-5 justify-center gap-9 lg:ml-6 fixed lg:top-[21%] bottom-0 w-[98%] lg:w-[82px] z-20">
      <div className="flex lg:flex-col sm:flex-row lg:h-[350px] lg:gap-0 gap-1 h-26 lg:w-[88px] bg-primary-black lg:justify-between pl-6 lg:p-0 justify-center items-center">

        <button onClick={() => setSelected("home")} className={`w-full lg:mt-0 mt-2 h-18 flex-wrap p-4 ${selected === "home" ? "lg:border-r-2" : ""}`}>
          <span className={`${selected === "home" ? "border-b-2 lg:border-none" : ""} inline-block`}>
            <BiHomeAlt2 size={32} color={`#ffff `} className="" />
          </span>
        </button>

        <button onClick={() => setSelected("curtidas")} className={`w-full lg:mt-0 mt-2  h-18 lg:mr-1 lg:mb-[-3px] flex-wrap lg:p-6 p-4  ${selected === "curtidas" ? "lg:border-r-2" : ""}`}>
          <span className={`${selected === "curtidas" ? "border-b-2 lg:border-none" : ""} inline-block`}>
            <RiHeart3Line size={32} color={`#ffff`} className="" />
          </span>
        </button>

        <button onClick={() => setSelected("comentadas")} className={`w-full lg:mt-0 mt-2  h-18 p-4 flex-wrap ${selected === "comentadas" ? "lg:border-r-2" : ""}`}>
          <span className={`${selected === "comentadas" ? "border-b-2 lg:border-none" : ""} inline-block`}>
            <IoChatbubbleOutline size={32} color={`#ffff`} className="" />
          </span>
        </button>

        <button onClick={() => { setSelected("acessos") }} className={`w-full lg:mt-0 mt-2  h-18  p-4  ${selected === "acessos" ? "lg:border-r-2" : ""}`}>
          <span className={`${selected === "acessos" ? "border-b-2 lg:border-none" : ""} inline-block`}>
            <GoPerson size={32} color={`#ffff`} className="" />
          </span>
        </button>

      </div>

      <button onClick={logoutUser} className={`lg:ml-[5px] lg:mt-6 w-full p-6 lg:flex hidden `}>
        <TfiPowerOff size={34} color="#e50101" />
      </button>

    </aside >
  );
};

export default Aside;
