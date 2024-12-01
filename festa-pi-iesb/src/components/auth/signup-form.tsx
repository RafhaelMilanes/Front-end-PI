"use client";

import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { faEnvelopeOpen } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../ui/button";
import { faPerson } from "@fortawesome/free-solid-svg-icons/faPerson";
import Link from "next/link";
import { AuthContext } from "@/context/AuthContext";

export const SignupForm = () => {
  const router = useRouter();
  const [nameField, setNameField] = useState("");
  const [emailField, setEmailField] = useState("@gmail.com");
  const [passwordField, setPasswordField] = useState("");
  const [msg, setMsg] = useState("");

  const context = useContext(AuthContext);

  const handleEnterButton = async () => {
    const user = { nome: nameField, email: emailField, senha: passwordField };
    setMsg("");

    const erro = await context?.registrar(user);
    if (erro) {
      setMsg(erro);
    } else {
      router.replace("/");
    }
  };
  return (
    <>
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
      <div className="flex justify-center items-center self-end mt-[-20px] md:flex-row">
        <div className="text-gray-500">Já tem uma conta?</div>
        <Link href={"/signin"} className="hover:underline">
          Entrar
        </Link>
      </div>
      <Button label="Criar conta" onClick={handleEnterButton} size={1} />
    </>
  );
};
