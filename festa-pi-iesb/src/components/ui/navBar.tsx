import Link from "next/link";
import { Logo } from "./logo";

function NavBar() {
  return (
    <nav className="flex justify-between bg-[#97A2D7] px-5">
      <div className="flex flex-row justify-between items-center w-1/2 h-16 text-white text-3xl">
        <Link href="/"><Logo size={54} /></Link>
        <Link href="/"><p>Início</p></Link>
        <Link href="/festas"><p>Festa</p></Link>
        <Link href="/explorar"><p>Explorar</p></Link>
        <Link href="/amigos"><p>Amigos</p></Link>
      </div>
      <Link href="/perfil" className="flex items-center">
        <img src="/assets/images/profile_icon.svg" alt="" />
      </Link>
    </nav>
  );
}

export default NavBar;
