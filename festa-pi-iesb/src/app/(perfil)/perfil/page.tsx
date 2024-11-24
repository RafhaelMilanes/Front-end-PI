import NavBar from "@/components/ui/navBar";
import Perfil from "@/components/ui/perfil";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <NavBar />
      <div className="flex flex-col items-center">
        <Perfil />
        <Link href="/">
          <div className="flex justify-center items-center px-16 py-3 mb-10 text-3xl bg-[#97A2D7] text-white rounded-3xl	">
            Sair
          </div>
        </Link>
      </div>
    </>
  );
}
