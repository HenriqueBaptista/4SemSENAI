import React, { useContext } from 'react';
import logoResp from "../../Assets/Images/Logo-home-resp.jpg";
import context from '../../Context/userContext';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  // CONSTS
  const { user } = useContext(context) // dados do usuário
  const navigate = useNavigate() // navegar entre telas



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
    <header className="bg-primary-black w-[97.2%] h-[80px] flex justify-between items-center py-6 fixed z-20">
      <div className='ml-[-13px] mt-12 pl-12 fixed'>
        <img
          className='w-14 h-14 pt-0 lg:block hidden rounded-2xl'
          alt='img perfil temp' src={user.imagem} />

        <p className='text-complementary-blue text-[14px] mt-[15px] mr-[27px] lg:flex hidden'>@{user.login}</p>
      </div>

      <h1 className='text-primary-white mr-[40px] right-1 top-4 font-kanit text-[30px] mt-[2px] lg:fixed lg:flex hidden'>TechConnect</h1>

      <a onClick={logoutUser}>
        <img
          src={logoResp}
          className='lg:hidden flex fixed top-[14px]	right-9 rounded-md'
        />
      </a>

    </header>
  )
}