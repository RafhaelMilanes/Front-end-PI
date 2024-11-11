import NavBar from "@/components/ui/navBar";
import EditarPerfil from "@/components/ui/editarPerfil";
import Link from "next/link";


export default function Page() {
    return(
        <>
            <NavBar />
            <EditarPerfil />
            <Link href="/"><p>Sair</p></Link>
        </>
    )
}