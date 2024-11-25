import { SigninForm } from "@/components/auth/signin-form";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import Link from "next/link";

export default function Page() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-[38rem] mx-5 bg-white rounded-3xl">
          <div className="p-4 py-6 rounded-t-3xl bg-[#97A2D7] relative justify-center flex flex-row items-center">
              <div className="absolute left-5">
                <Logo size={56} />
              </div>
              <h1 className="flex text-white text-4xl">Login</h1>
          </div>

          <div className="p-6">
              <div className="my-7 flex flex-col">
                  <SigninForm />
              </div>
          </div>
      </div>
    </div>
  );
}
