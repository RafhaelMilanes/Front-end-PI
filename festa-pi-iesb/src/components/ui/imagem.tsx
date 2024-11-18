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

function Imagem() {
  const item = {
    title: "Role da Baixada",
    date: "30 de Agosto de 2024",
    imagem: "/assets/images/Imagem.png",
    value: "R$ 15,00",
    description:
      "Descrição: Lorem ipsum dolor sit amet. Ut reprehenderit quidem ut soluta nesciunt a explicabo nihil eum fuga nisi qui aspernatur laboriosam qui pariatur accusamus est similique quia. Vel quis officiis et repellat voluptatem qui culpa voluptatibus. Vel dolor labore aut nisi voluptas sit eaque similique vel iure facere ea molestias veritatis qui nulla ullam. ",
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
          <div className=" px-8">
            <h1 className="text-5xl">{item.title}</h1>
            <h2 className="text-2xl">{item.date}</h2>
          </div>
        )}
      </div>
    </>
  );
}

export default Imagem;
