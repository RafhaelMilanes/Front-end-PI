"use client";
import {
  adicinarAmigo,
  buscarTodosUsuarios,
  buscarUsuarios,
} from "@/service/AmigosService";
import React, { createContext, useState, ReactNode } from "react";

interface AmigosContextType {
  amigos: object[];
  setAmigos: React.Dispatch<React.SetStateAction<object[]>>;
  erro: string;
  setErro: React.Dispatch<React.SetStateAction<string>>;
  carregarAmigos: (id: number | null) => Promise<void>;
  addAmigo: (id: number, idNovoAmigo: number) => Promise<void>;
  buscarTodos: (
    usuarioId: number | undefined
  ) => Promise<{ sucesso: boolean; dados: object[]; msg: string }>;
}

const AmigosContext = createContext<AmigosContextType | undefined>(undefined);

interface AmigosProviderProps {
  children: ReactNode;
}

function AmigosProvider({ children }: AmigosProviderProps) {
  const [amigos, setAmigos] = useState<object[]>([
    { id: 0, nome: "", email: "", festas: [], amigos: [] },
  ]);
  const [erro, setErro] = useState<string>("");

  const carregarAmigos = async (id: number | null): Promise<void> => {
    const amigos = await buscarUsuarios(id);
    setAmigos(amigos);
  };

  const addAmigo = async (
    id: number,
    idNovoAmigo: number
  ): Promise<boolean> => {
    try {
      const resposta = await adicinarAmigo(id, idNovoAmigo);
      if (resposta.sucesso) {
        await carregarAmigos(id);
        return true;
      } else {
        setErro("Erro ao adicionar amigo:", resposta.msg);
        return false;
      }
    } catch (error) {
      setErro("Erro ao adicionar amigo:", error);
      return false;
    }
  };

  const buscarTodos = async (usuarioId: number | undefined) => {
    try {
      const resposta = await buscarTodosUsuarios(usuarioId);
      if (resposta.sucesso) {
        return resposta.dados;
        setErro("");
      } else {
        setErro("Erro ao buscar todos os usuários:", resposta.msg);
        return [];
      }
    } catch (error) {
      setErro("Erro ao buscar todos os usuários:", error);
      return [];
    }
  };

  return (
    <AmigosContext.Provider
      value={{
        amigos,
        setAmigos,
        erro,
        setErro,
        carregarAmigos,
        addAmigo,
        buscarTodos,
      }}
    >
      {children}
    </AmigosContext.Provider>
  );
}

export { AmigosContext, AmigosProvider };
