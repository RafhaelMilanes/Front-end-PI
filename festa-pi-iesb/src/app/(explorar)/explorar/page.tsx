"use client";
import NavBar from "@/components/ui/navBar";
import { SearchInput } from "@/components/ui/search-input";
import { Explorar } from "@/components/ui/explorar";

export default function page() {
  return (
    <>
      <NavBar />
      <div className="grid grid-row items-center w-full pt-10 px-10 grid-rows-[repeat(auto-fit,minmax(50px,1fr))] grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
        <h1 className="text-white pb-5 text-7xl">Explorar</h1>
        <div>
          <SearchInput />
        </div>
      </div>
      <p className="px-10 text-white pt-5 text-4xl pb-2">Festas disponiveis</p>
      <Explorar/>
    </>
  );
}
