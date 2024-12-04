"use client"
import { AmigosContext } from "@/context/AmigosContext";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export const useScreenWidth = () => {
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

  const handleWindowSizeChange = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  return screenWidth;
};

export const Amigos = () => {
  const router = useRouter()
  const tamanhoTela = useScreenWidth();

  var items = [
    {
      id: 0,
      festas: [],
      nome: "",
      email: "",
      amigos: [],
    },
  ];

  const contextUser = useContext(AuthContext);
  const contextAmigos = useContext(AmigosContext);

  const userId = contextUser?.usuario?.id

  useEffect(() => {
    contextAmigos?.carregarAmigos(userId);
  }, []);

  items = contextAmigos?.amigos;

  return (
    <>
      {tamanhoTela > 735 ? (
        <ul>
          {items.map((item, index) => (
            <li className="w-full my-8 px-10" key={index}>
              <div className="flex justify-center w-full">
                {/* Parte Esquerda */}
                <div className="w-[30%] py-3 flex-col bg-[#97A2D7] text-white flex justify-center items-start px-8 rounded-s-3xl">
                  <p className="text-2xl">{item.nome}</p>
                  <p className="text-sm">
                    {item.amigos.length} amigos em comum
                  </p>
                </div>

                {/* Parte Central */}
                <div className="w-[50%] bg-[#97A2D7] flex flex-col justify-start items-start px-3  rounded-e-3xl">
                  <h3>Confirmado para:</h3>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <ul>
          {items.map((item, index) => (
            <li className="w-full px-10 py-5" key={index}>
              <div className="">
                {/* Parte Top Mobile*/}
                <div className="flex flex-col items-center bg-[#97A2D7] text-white py-4 rounded-t-3xl">
                  <p className="text-2xl">{item.nome}</p>
                  <p className="text-sm">{item.amigos.length} amigos em comum</p>
                </div>

                {/* Parte Central Mobile*/}
                <div className="bg-[#97A2D7] py-4 px-3 rounded-b-3xl">
                  <h3>Confirmado para:</h3>
                  <p>{item.festas}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
