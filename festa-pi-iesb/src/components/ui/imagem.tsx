"use client"
import { useEffect, useState } from "react";
import NavBar from "./navBar";

const useScreenWidth = () => {
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

function Imagem(props) {
  const item = {
    title: props.titulo,
    date: props.data,
    imagem: "/assets/images/Imagem.png",
  };

  const tamanhoTela = useScreenWidth();

  return (
    <>
      <NavBar />
      <div>
        <img src={item.imagem} alt="Imagem da Festa" />
        {tamanhoTela > 735 ? (
          <div className="mt-[-60px] px-8 flex flex-row items-end justify-between">
            <h1 className="text-5xl">{item.title}</h1>
            <h2 className="text-2xl">{item.date}</h2>
          </div>
        ) : (
          <div className="mt-6 px-8">
            <h1 className="text-5xl">{item.title}</h1>
            <h2 className="text-2xl">{item.date}</h2>
          </div>
        )}
      </div>
    </>
  );
}

export default Imagem;
