import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import context from "./../Context/userContext"

// imports de tela
import { Home } from "../Pages/Home"
import { Login } from "../Pages/Login/index";
import App from "../App";

export const RoutesPage = () => {
    const [user, setUser] = useState({}); // dados do usuário

    // se o usuario estiver logado ele navega para a pagina representada pelo children
    const ProtectedRoute = (props) => {
        return user.login ? props.children : <Navigate to="/" />
    }

    return (
        <BrowserRouter>
            <Routes>
                {/* rota para o elemento login */}
                <Route element={
                    <context.Provider value={{ setUser }}>
                        <Login />
                    </context.Provider>
                } path="/" />

                {/* rota para o elemento cadastro */}
                <Route element={
                    <context.Provider value={{ setUser }}>
                        <App />
                    </context.Provider>
                } path="/cadastro" />

                {/* rota para o elemento home */}
                <Route element={
                    <context.Provider value={{ user }}>
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    </context.Provider>
                } path="/home" />

                {/* se a rota for qualquer outra coisa, ela voltará para o login */}
                <Route path="/*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    )
}