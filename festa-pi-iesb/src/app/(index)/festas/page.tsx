"use client";
import NavBar from "@/components/ui/navBar";
import { SearchInput } from "@/components/ui/search-input";
import { Ticket } from "@/components/ui/ticket";

export default function page() {
  return (
    <>
      <NavBar />
      <div className="grid grid-row items-center w-full pt-10 px-10 grid-rows-[repeat(auto-fit,minmax(50px,1fr))] grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
        <h1 className="text-white pb-5 text-7xl">Festas</h1>
        <div>
          <SearchInput />
        </div>
      </div>
      <Ticket/>
    </>
  );
}
