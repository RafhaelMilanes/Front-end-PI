"use client"

import { useRouter } from "next/navigation"
import { useState } from "react";
import { Input } from "../ui/input";
import { faEnvelopeOpen } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../ui/button";
import Link from "next/link";

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

            <div className="flex justify-center items-center self-end md:flex-row">
                <p className="text-gray-500">Ainda nao tem conta?</p>
                <Link href={"/signup"} className="hover:underline">
                Casdastre-se
                </Link>
            </div>

            <Button label="Entrar" onClick={handleEnterButton} size={1}/>
        </>
    )
}