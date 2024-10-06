import { SignupForm } from "@/components/auth/signup-form";
import { Logo } from "@/components/ui/logo";
import Link from "next/link";

export default function Page() {
  return (
    <div className="max-w-lg mx-auto mt-12 bg-white rounded-lg">
        <div className="p-4 rounded-t-lg bg-[#97A2D7] flex flex-row items-center">
            <Logo size={56} />
            <h1 className="ml-24 text-white text-3xl">Crie a sua conta</h1>
        </div>

        <div className="p-6">
            <div className=" mt-10 mb-14 flex flex-col gap-6">
                <SignupForm />
            </div>
            <div className="flex flex-col justify-center items-center gap-1 md:flex-row">
                <div className="text-gray-500">Já tem uma conta?</div>
                <Link href={"/signin"} className="hover:underline">
                Entrar
                </Link>
            </div>
      </div>
    </div>
  );
}
