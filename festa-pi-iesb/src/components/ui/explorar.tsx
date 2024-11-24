import { useEffect, useState } from "react";

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
  const items = [
    {
      title: "Festa de Bulano",
      date: "18 de Novembro de 2024",
      value: "R$ 300,00",
      description:
        "Descrição: Lorem ipsum dolor sit amet. Ut reprehenderit quidem ut soluta nesciunt a explicabo nihil eum fuga nisi qui aspernatur laboriosam qui pariatur accusamus est similique quia. Vel quis officiis et repellat voluptatem qui culpa voluptatibus. Vel dolor labore aut nisi voluptas sit eaque similique vel iure facere ea molestias veritatis qui nulla ullam. ",
    },
    {
      title: "Furacão 2000",
      date: "18 de Novembro de 2024",
      value: "R$ 35,00",
      description:
        "Descrição: Lorem ipsum dolor sit amet. Ut reprehenderit quidem ut soluta nesciunt a explicabo nihil eum fuga nisi qui aspernatur laboriosam qui pariatur accusamus est similique quia. Vel quis officiis et repellat voluptatem qui culpa voluptatibus. Vel dolor labore aut nisi voluptas sit eaque similique vel iure facere ea molestias veritatis qui nulla ullam. ",
    },
    {
      title: "Oktoberfest",
      date: "30 de Agosto de 2024",
      value: "R$ 150,00",
      description:
        "Descrição: Lorem ipsum dolor sit amet. Ut reprehenderit quidem ut soluta nesciunt a explicabo nihil eum fuga nisi qui aspernatur laboriosam qui pariatur accusamus est similique quia. Vel quis officiis et repellat voluptatem qui culpa voluptatibus. Vel dolor labore aut nisi voluptas sit eaque similique vel iure facere ea molestias veritatis qui nulla ullam. ",
    },
    {
      title: "Otakolândia",
      date: "30 de Agosto de 2024",
      value: "R$ 300,00",
      description:
        "Descrição: Lorem ipsum dolor sit amet. Ut reprehenderit quidem ut soluta nesciunt a explicabo nihil eum fuga nisi qui aspernatur laboriosam qui pariatur accusamus est similique quia. Vel quis officiis et repellat voluptatem qui culpa voluptatibus. Vel dolor labore aut nisi voluptas sit eaque similique vel iure facere ea molestias veritatis qui nulla ullam. ",
    },
  ];

  const tamanhoTela = useScreenWidth();

  return (
    <>
      {tamanhoTela > 735 ? (
        <ul>
          {items.map((item, index) => (
            <li className="w-full mb-8 px-10" key={index}>
              <div className="flex justify-center w-full">
                {/* Parte Esquerda */}
                <div className="w-[20%] py-3 flex-col bg-[#97A2D7] text-white flex justify-center items-start px-8 rounded-s-3xl">
                  <p className="text-2xl">{item.title}</p>
                  <p className="text-sm">{item.date}</p>
                  <p>Valor: {item.value}</p>
                </div>

                {/* Parte Central */}
                <div className="w-[60%] bg-white flex justify-start items-start px-3">
                  <p>{item.description}</p>
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
          {items.map((item, index) => (
            <li className="w-full px-10 py-5" key={index}>
              <div className="">
                {/* Parte Top Mobile*/}
                <div className="flex flex-col items-center bg-[#97A2D7] text-white py-4 rounded-t-3xl">
                  <p className="text-2xl">{item.title}</p>
                  <p className="text-sm">{item.date}</p>
                  <p>Valor: {item.value}</p>
                </div>

                {/* Parte Central Mobile*/}
                <div className="bg-white py-4 px-3">
                  <p>{item.description}</p>
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
