"use client";
import React, { createContext, useState, ReactNode } from "react";
import { autenticar, cadastrar, alterar, alterarSenha } from "../service/AuthService";

interface UserData {
  id?: number;
  nome?: string;
  token?: string;
  email?: string;
  senha?: string;
  logado?: boolean;
}

interface AuthContextType {
  usuario: UserData | null;
  setUsuario: React.Dispatch<React.SetStateAction<UserData | null>>;
  login: (dados: UserData) => Promise<void | string>;
  logout: () => void;
  registrar: (dados: UserData) => Promise<void | string>;
  atualizar: (dados: UserData) => Promise<void | string>;
  atualizarSenha: (dados: UserData) => Promise<void | string>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [usuario, setUsuario] = useState<UserData | null>();

  const login = async (dados: UserData) => {
    const resposta = await autenticar(dados);
    if (resposta.sucesso) {
      setUsuario({
        id: resposta.dados.user.id,
        token: resposta.dados.accessToken,
        nome: resposta.dados.user.nome,
        email: resposta.dados.user.email,
        logado: true,
      })
    } else {
      return resposta.msg;
    }
    return null;
  };

  const logout = async () => {
    setUsuario(null);
  };

  const registrar = async (dados: UserData) => {
    const resposta = await cadastrar(dados);
    if (resposta.sucesso) {
      setUsuario({nome: dados.nome, email: dados.email, logado: true });
    } else {
      return resposta.msg;
    }
  };

  const atualizar = async (dados: UserData) => {
    const resposta = await alterar(dados);
    if (resposta.sucesso) {
      setUsuario((prev) => (prev ? { ...prev, email: dados.email } : null));
    } else {
      return resposta.msg;
    }
    return "";
  };

  const atualizarSenha = async (dados: UserData) => {
    const resposta = await alterarSenha(dados);
    if (resposta.sucesso) {
      setUsuario((prev) => (prev ? { ...prev, email: dados.email } : null));
    } else {
      return resposta.msg;
    }
    return "";
  };

  return (
    <AuthContext.Provider
      value={{ usuario, setUsuario, login, logout, registrar, atualizar, atualizarSenha }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
