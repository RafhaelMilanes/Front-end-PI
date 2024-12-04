"use client";
import NavBar from "@/components/ui/navBar";
import { SearchInput } from "@/components/ui/search-input";
import { Amigos } from "@/components/ui/amigos";
import { Solicitacoes } from "@/components/ui/solicitacoes";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function page() {
  const contextAuth = useContext(AuthContext)
  const router = useRouter();
  
  useEffect(() => {
    if (contextAuth?.usuario === null) {
      router.push("/")
    }
  }, [])

  return (
    <>
      <NavBar />
      <div className="grid grid-row items-center w-full pt-10 px-10 grid-rows-[repeat(auto-fit,minmax(50px,1fr))] grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
        <h1 className="text-white pb-5 text-7xl">Amigos</h1>
          <Link className="flex justify-end items-center mb-8" href="/explorarAmigos">
            <Button label="Explorar" size={1}  />
          </Link>
      </div>
      <p className="px-10 text-white pt-5 text-4xl">Amizades</p>
      <Amigos />
    </>
  );
}
