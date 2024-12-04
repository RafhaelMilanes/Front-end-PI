"use client";
import NavBar from "@/components/ui/navBar";
import { NovaFesta } from "@/components/ui//novafesta";

export default function page() {
  return (
    <>
      <NavBar />
      <div className="w-full h-full py-32 flex justify-center items-center">
        <div className="w-[600px] h-full mx-5  bg-white rounded-3xl p-7 ">

        <NovaFesta />

    </div> </div>

    </>
  );
}
    	    	 