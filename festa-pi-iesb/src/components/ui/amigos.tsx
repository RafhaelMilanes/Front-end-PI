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

export const Amigos = () => {
  const items = [
    {
      nomeAmizade: "João damassa",
      amizade: "32",
      description:
        "Rebolation 2024",
    },
    {
      nomeAmizade: "Jorgim da 12",
      amizade: "12",
      description:
        "Pisadinha 389",
    },
  ];

  const tamanhoTela = useScreenWidth();

  return (
    <>
      {tamanhoTela > 735 ? (
        <ul>
          {items.map((item, index) => (
            <li className="w-full my-8 px-10" key={index}>
              <div className="flex justify-center w-full">
                {/* Parte Esquerda */}
                <div className="w-[30%] py-3 flex-col bg-[#97A2D7] text-white flex justify-center items-start px-8 rounded-s-3xl">
                  <p className="text-2xl">{item.nomeAmizade}</p>
                  <p className="text-sm">{item.amizade} amigos em comum</p>
                </div>

                {/* Parte Central */}
                <div className="w-[50%] bg-white flex flex-col justify-start items-start px-3  rounded-e-3xl">
                  <h3>Confirmado para:</h3>
                  <p>{item.description}</p>
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
                  <p className="text-2xl">{item.nomeAmizade}</p>
                  <p className="text-sm">{item.amizade} amigos em comum</p>
                </div>

                {/* Parte Central Mobile*/}
                <div className="bg-white py-4 px-3">
                  <h3>Confirmado para:</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
