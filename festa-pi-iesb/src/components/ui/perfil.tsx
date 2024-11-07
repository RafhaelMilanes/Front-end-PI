"use client";
import { useRouter } from "next/navigation";
import { faEnvelopeOpen } from "@fortawesome/free-solid-svg-icons";
import { faPerson } from "@fortawesome/free-solid-svg-icons/faPerson";
import { useState } from "react";
import { Button } from "./button";

function perfil() {
  const router = useRouter();
  //vai ser trocado por uma requisição do banco
  const [nameField] = useState("Jose Reginaldo");
  const [emailField] = useState("Reginaldo@gmail.com");
  
  const designTailwind = "flex-1 outline-none h-full px-4 rounded-xl bg-[#eee] border-none";

  const irEditar = () => {
    router.replace("/perfil/editar");
  };

  return (
    <>
      <div className="w-full h-full py-32 flex justify-center items-center">
        <div className="w-[38rem] mx-5 bg-white rounded-3xl">
          <div className="p-4 py-6 rounded-t-3xl bg-[#97A2D7] relative justify-center flex flex-row items-center">
            <h1 className="flex text-white text-4xl">Perfil</h1>
          </div>

          <div className="p-5">
            <div className="my-6 flex flex-col">
              
                <label >Nome: </label>
                <p className={designTailwind}>{nameField}</p>
              
                <label >Email: </label>
                <p className={designTailwind}>{emailField}</p>
            </div>
            <Button label="Alterar Dados" onClick={irEditar} size={1} />
          </div>
        </div>
      </div>
    </>
  );
}

export default perfil;
