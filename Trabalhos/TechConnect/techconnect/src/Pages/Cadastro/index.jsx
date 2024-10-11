import { useContext, useEffect, useState } from "react";
import { Button, LinkButton } from "../../Components/Button";
import { Input } from "../../Components/Input";
import { Subtitle, Text, Title } from "../../Components/Texts";
import { Logo } from "../../Components/Logo";
import { octokit } from "../../Utils/githubkey";
import { v4 as uuid } from "uuid";


import { useNavigate } from 'react-router-dom'
import context from "../../Context/userContext";


export const Cadastro = () => {
    //CONSTS
    const [erro, setErro] = useState(false); // seta o estado de erro
    const [load, setLoad] = useState(false); // seta o estado de leitura do botão
    const [username, setUsername] = useState(""); // muda o nome do usuário
    const [message, setMessage] = useState(""); // mensagem a ser exibida
    const { setUser } = useContext(context); // contexto do usuário
    const navigate = useNavigate() // pode navegar entre telas



    // FUNCTIONS
    // função ara validar o usuário
    function validateUser(e) {
        e.preventDefault(); // previne respostas sem valor

        setLoad(true); // ativa a leitura do botão

        // se no input não houver nome de usuário
        if (username === "") {
            return (setMessage("Por favor, digite o seu username"), setErro(true), setLoad(false));
        }

        // função para ver se existe um usuário cadastrado com o mesmo nome no GitHub
        octokit.request("GET /users/{username}", {
            username: username,
            headers: {
                "X-GitHub-Api-Version": "2022-11-28"
            }
        }).then(async response => {
            setErro(false);

            const verify = await verifyUserExistence()

            if (verify) {
                setErro(true);
                setMessage("Usuário já cadastrado ")
                setLoad(false);
            } else {
                registerUser(response.data)

                setErro(false);
                setLoad(false);
                navigate("/home");
            }

        }).catch(() => {
            setErro(true);
            setMessage("Não foi possível cadastrar, tente novamente mais tarde");
            setLoad(false);
        });
    }

    const registerUser = (user) => {
        try {
            const data = {
                id: uuid(),
                imagem: user.avatar_url,
                login: user.login.toLowerCase(),
                nome: user.name,
            }

            fetch("http://localhost:3000/usuario", {
                method: "POST",
                body: JSON.stringify(data)
            })

            setUser(data);
        } catch (e) {
            setMessage("Não foi possível registrar o usuário, tente novamente");
        }
    }

    // verifica se o usuário já existe
    const verifyUserExistence = () => {
        return fetch(`http://localhost:3000/usuario?login=${username.toLocaleLowerCase()}`)
            .then(response => response.json())
            .then(response => {
                if (response.length > 0) {
                    return true;
                }
                return false;
            }).catch(() => {
                alert("Não foi possível consultar o usuário")
            })
    }



    // EFFECTS
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
        <div className="flex box-border bg-primary-black w-full h-screen items-center justify-center max-md:flex-col-reverse max-md:gap-[41px]">
            <div className=" flex flex-col w-1/2 max-md:w-full items-center gap-[30px]">
                <div className="flex flex-col gap-[57px] max-md:gap-[10px]">
                    <Title>Registro</Title>

                    <Subtitle>Para registrar sua conta, informe seu usuário de acesso vínculado ao GitHub</Subtitle>
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
                        buttonTitle={"Registrar"}
                        load={load}
                    />

                    <Text>Já possui uma conta? <LinkButton onClick={() => navigate("login")}>Acesse-a aqui!</LinkButton></Text>
                </div>
            </div>

            <div className="flex w-1/2 items-center  max-md:w-full justify-center">
                <Logo />
            </div>
        </div>
    )
}