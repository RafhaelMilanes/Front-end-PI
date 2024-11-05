"use client";

import { faEnvelopeOpen } from "@fortawesome/free-solid-svg-icons";
import { faPerson } from "@fortawesome/free-solid-svg-icons/faPerson";
import { useState } from "react";
import { Input } from "./input";
import { Button } from "./button";

function perfil() {
  const [nameField, setNameField] = useState("Jose Reginaldo");
  const [emailField, setEmailField] = useState("Reginaldo@gmail.com");
  const [passwordField, setPasswordField] = useState("123456");

  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="w-[38rem] mx-5 bg-white rounded-3xl">
          <div className="p-4 py-6 rounded-t-3xl bg-[#97A2D7] relative justify-center flex flex-row items-center">
            <h1 className="flex text-white text-4xl">Perfil</h1>
          </div>

          <div className="p-5">
            <div className="my-6 flex flex-col">
              <Input
                label="Nome:"
                placeholder="Digite seu nome"
                icon={faPerson}
                value={nameField}
                onChange={(t) => setNameField(t)}
              />
              <Input
                label="Email:"
                placeholder="Digite seu e-mail"
                icon={faEnvelopeOpen}
                value={emailField}
                onChange={(t) => setEmailField(t)}
              />
              <Input
                label="Senha:"
                placeholder="Digite sua senha"
                value={passwordField}
                onChange={(t) => setPasswordField(t)}
                password
              />
            </div>
        <Button label="Atualizar dados" size={1} />
          </div>
        </div>
      </div>
    </>
  );
}

export default perfil;
