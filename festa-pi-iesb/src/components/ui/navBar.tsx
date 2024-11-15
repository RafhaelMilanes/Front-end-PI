import Link from "next/link";
import { Logo } from "./logo";

function NavBar() {
  return (
    <nav className="flex justify-between bg-[#97A2D7] px-5">
      <Link href="/home"><Logo size={54} /></Link>
      <div className="flex flex-row justify-around items-center w-4/6 h-16 text-white text-xl">
        <Link href="/home"><p>Início</p></Link>
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
