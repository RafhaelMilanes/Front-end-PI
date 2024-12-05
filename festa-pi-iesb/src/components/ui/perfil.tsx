"use client";

import { faEnvelopeOpen } from "@fortawesome/free-solid-svg-icons";
import { faPerson } from "@fortawesome/free-solid-svg-icons/faPerson";
import { useContext, useState } from "react";
import { Input } from "./input";
import { Button } from "./button";
import { AuthContext } from "@/context/AuthContext";

function perfil() {
  const context = useContext(AuthContext);
  const [nameField, setNameField] = useState(context?.usuario?.nome);
  const [emailField, setEmailField] = useState(context?.usuario?.email);
  const [passwordField, setPasswordField] = useState("");

  function enviar() {
    if (passwordField === "") {
      return context?.atualizar({ nome: nameField, email: emailField });
    } else {
      return context?.atualizarSenha({
        nome: nameField,
        email: emailField,
        password: passwordField,
      });
    }
  }

  return (
    <>
      <div className="w-full h-full py-32 flex justify-center items-center">
        <div className="w-[38rem] mx-5  bg-white rounded-3xl">
          <div className="p-4 py-6 rounded-t-3xl bg-[#97A2D7] relative justify-center flex flex-row items-center">
            <h1 className="flex text-white text-4xl">Dados Pessoais</h1>
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
            <Button label="Atualizar Dados" size={1} onClick={enviar} />
          </div>
        </div>
      </div>
    </>
  );
}

export default perfil;
