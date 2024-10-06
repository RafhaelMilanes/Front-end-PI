"use client"

import { useRouter } from "next/navigation"
import { useState } from "react";
import { Input } from "../ui/input";
import { faEnvelopeOpen } from "@fortawesome/free-solid-svg-icons";

export const SigninForm = () => {
    const router = useRouter();
    const [emailField, setEmailField] = useState("")
    const [passwordField, setPasswordField] = useState("")

    const handleEnterButton = () => {
        router.replace("/home")
    }

    return (
        <>
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

            <button onClick={handleEnterButton}>Entrar</button>
        </>
    )
}