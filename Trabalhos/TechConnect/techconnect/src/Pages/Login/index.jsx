import React, { useContext, useEffect, useState } from 'react';
import { Input } from '../../Components/Input'
import { Button, LinkButton } from '../../Components/Button'
import context from '../../Context/userContext'
import { useNavigate } from 'react-router-dom'
import { Logo } from '../../Components/Logo'
import { Subtitle, Text, Title } from '../../Components/Texts'

export const Login = () => {
  // CONSTS
  const { setUser } = useContext(context) // importando dentro do contexto, a função de alimentar os dados do usuario
  const navigate = useNavigate(); // usado para navegar para outras páginas
  const [load, setLoad] = useState(false) // seta o estado de leitura do botão
  const [message, setMessage] = useState(""); // mensagem a ser exibida
  const [username, setUsername] = useState(""); // muda o nome do usuário
  const [erro, setErro] = useState(false); // seta o estado de erro



  // FUNCTIONS
  // função para validar usuários
  const validateUser = (e) => {
    e.preventDefault();
    setLoad(true);
    fetch(`http://localhost:3000/usuario?login=${username.toLowerCase()}`)
      .then(response => response.json())
      .then(response => {
        if (response[0]) {
          const user = response[0];
          setUser(user); // Alimento os dados do user para o context da aplicacao

          // Atualiza a data e hora do acesso
          const currentDate = new Date().toISOString();
          fetch(`http://localhost:3000/usuario/${user.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ultimoAcesso: currentDate })
          })
            .then(() => {
              navigate("/home");
            })
            .catch((error) => {
              console.error("Erro ao atualizar data de acesso:", error);
            });
          setUser(response[0])
          navigate("/home")

          setErro(false);
          setLoad(false);
        } else {
          setErro(true);
          setMessage("Usuário não encontrado!");
          setLoad(false);
        }
      }).catch((error) => {
        alert(error);
        setLoad(false);
      });

    setUsername("");
  }



  // EFFECTS
  // limpa os dados de acesso do usuario
  useEffect(() => {
    setUser({});
  }, [])

  // limpa a mensagem de erro depois de um tempo
  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage("");
        setErro(false);
      }, 5000)
    }
  }, [message])



  return (
    <div className="flex box-border bg-primary-black w-full h-screen items-center justify-center max-md:flex-col-reverse md:flex-row-reverse max-md:gap-[41px]">
      <div className=" flex flex-col w-1/2 max-md:w-full items-center gap-[30px]">
        <div className="flex flex-col gap-[57px] max-md:gap-[10px]">
          <Title>Login</Title>

          <Subtitle styles={"max-md:w-[250px]"}>Para acessar sua conta, informe seu usuário de acesso vínculado ao GitHub</Subtitle>
        </div>

        <div className="h-[130px] max-md:h-[90px] flex flex-col gap-[31px] max-md:gap-[16px]">
          <Input
            label={"Usuário de acesso"}
            erro={erro}
            onChange={(txt) => setUsername(txt.target.value)}
            value={username}
          />

          {
            erro ?
              <Text erro={erro}>{message}</Text>
              :
              ""
          }
        </div>

        <div className="flex flex-col gap-[55px] max-md:gap-[36px]">
          <Button
            onClick={validateUser}
            buttonTitle={"Login"}
            load={load}
          />

          <Text>Não possui uma conta? <LinkButton onClick={() => { navigate("/cadastro") }}>Crie uma aqui!</LinkButton></Text>
        </div >
      </div >

      <div className="flex w-1/2 items-center  max-md:w-full justify-center">
        <Logo />
      </div>
    </div >
  )
}