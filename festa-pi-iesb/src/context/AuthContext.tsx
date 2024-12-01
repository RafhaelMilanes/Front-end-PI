"use client";
import React, { createContext, useState, ReactNode } from "react";
import { autenticar, cadastrar, alterar } from "../service/AuthService";
import { promises } from "dns";

interface UserData {
  id?: string;
  nome?: string;
  token?: string;
  email?: string;
  logado?: boolean;
}

interface AuthContextType {
  usuario: UserData;
  setUsuario: React.Dispatch<React.SetStateAction<UserData>>;
  login: (dados: UserData) => Promise<void | string>;
  logout: () => Promise<void>;
  registrar: (dados: UserData) => Promise<void | string>;
  atualizar: (dados: UserData) => Promise<void | string>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [usuario, setUsuario] = useState<object>({
    id: "",
    token: "",
    nome: "",
    email: "",
    logado: false,
  });

  const login = async (dados: UserData) => {
    const resposta = await autenticar(dados);
    if (resposta.sucesso) {
      setUsuario({
        id: resposta.dados.user.id,
        token: resposta.dados.accessToken,
        nome: resposta.dados.nome,
        email: dados.email,
        logado: true,
      });
    } else {
      return resposta.msg;
    }
    return null;
  };

  const logout = async () => {
    setUsuario({
        id: "",
        token: "",
        nome: "",
        email: "",
        logado: false,
    });
  };

  const registrar = async (dados: UserData) => {
    const resposta = await cadastrar(dados);
    if (resposta.sucesso) {
      return setUsuario({nome: dados.nome, email: dados.email, logado: true });
    } else {
      return resposta.msg;
    }
  };

  const atualizar = async (dados: UserData) => {
    const resposta = await alterar(dados);
    if (resposta.sucesso) {
      setUsuario({ email: dados.email, logado: true });
    } else {
      return resposta.msg;
    }
    return "";
  };

  return (
    <AuthContext.Provider
      value={{ usuario, setUsuario, login, logout, registrar, atualizar }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
