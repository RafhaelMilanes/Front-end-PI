"use client";
import NavBar from "@/components/ui/navBar";
import { NovaFesta } from "@/components/ui//novafesta";

export default function page() {
  return (
    <>
      <NavBar />
      <div className="w-full h-full py-32 flex justify-center items-center">
        <div className="w-[600px] h-full mx-5  bg-white rounded-3xl ">
          <div className="p-7 bg-[#97a2d7] flex justify-center text-white text-7xl rounded-t-3xl">
            <h1>Criar nova Festa</h1>
          </div>
          <div className="p-7">
          <NovaFesta />
          </div>
        </div>
      </div>
    </>
  );
}
