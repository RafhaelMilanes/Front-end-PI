import { useEffect, useState, useContext } from "react";
import { FestasContext } from "@/context/FestaContext";

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

export const Explorar = () => {

  const context = useContext(FestasContext);
  useEffect(() => {context?.carregar()}, [])

  const tamanhoTela = useScreenWidth();

  return (
    <>
      {tamanhoTela > 735 ? (
        <ul>
          {context?.Festas.map((item, index) => (
            <li className="w-full mb-8 px-10" key={index}>
              <div className="flex justify-center w-full">
                {/* Parte Esquerda */}
                <div className="w-[20%] py-3 flex-col bg-[#97A2D7] text-white flex justify-center items-start px-8 rounded-s-3xl">
                  <p className="text-2xl">{item.nome}</p>
                  <p className="text-sm">{item.data}</p>
                  <p>Valor: {item.valor}</p>
                </div>

                {/* Parte Central */}
                <div className="w-[60%] bg-white flex justify-start items-start px-3">
                  <p>{item.descricao}</p>
                </div>

                {/* Parte Direita */}
                <div className="w-[10%] bg-[#97A2D7] justify-around	 text-white flex justify-center items-center rounded-e-3xl">
                  <button className="flex flex-col items-center">
                    <p>Comprar ingresso</p>
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <ul>
          {context?.Festas.map((item, index) => (
            <li className="w-full px-10 py-5" key={index}>
              <div className="">
                {/* Parte Top Mobile*/}
                <div className="flex flex-col items-center bg-[#97A2D7] text-white py-4 rounded-t-3xl">
                  <p className="text-2xl">{item.nome}</p>
                  <p className="text-sm">{item.data}</p>
                  <p>Valor: {item.valor}</p>
                </div>

                {/* Parte Central Mobile*/}
                <div className="bg-white py-4 px-3">
                  <p>{item.descricao}</p>
                </div>

                {/* Parte Down Mobile*/}
                <div className="flex flex-row justify-evenly items-center bg-[#97A2D7] text-white py-4 rounded-b-3xl">
                  <button className="flex flex-col items-center">
                    <p>Comprar ingresso</p>
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
