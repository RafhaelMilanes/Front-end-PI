"use client"
import NavBar from "@/components/ui/navBar";
import { SearchInput } from "@/components/ui/search-input";

export default function page() {
    return(
        <>
            <NavBar />

            <div className="w-[328px] ml-auto m-10 text-white ">
                <SearchInput />
            </div>
            
        </>
    )
}