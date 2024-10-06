"use client"

import { useRouter } from "next/navigation"
import { useState } from "react";
import { Input } from "../ui/input";
import { faEnvelopeOpen } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../ui/button";
import { faPerson } from "@fortawesome/free-solid-svg-icons/faPerson";

export const SignupForm = () => {
    const router = useRouter();
    const [nameField, setNameField] = useState("")
    const [emailField, setEmailField] = useState("@gmail.com")
    const [passwordField, setPasswordField] = useState("")

    const handleEnterButton = () => {
        router.replace("/home")
    }
    return (
        <>
            <Input
                label="Nome:"
                placeholder="Digite seu nome"
                icon={faPerson}
                value={nameField}
                onChange={t => setNameField(t)}
            />
            <Input
                label="Email:"
                placeholder="Digite seu e-mail"
                icon={faEnvelopeOpen}
                value={emailField}
                onChange={t => setEmailField(t)}
            />
            <Input
                label="Senha:"
                placeholder="Digite sua senha"
                value={passwordField}
                onChange={t => setPasswordField(t)}
                password
            />
            <Button label="Criar conta" onClick={handleEnterButton} size={1}/>
        </>
    )
}