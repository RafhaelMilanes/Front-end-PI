"use cliente"

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Input } from "./input";
import {  useState  } from "react"
import { useRouter } from "next/navigation";

type Props = {
    defaultValue?: string
}
export const SearchInput = ({defaultValue}: Props) => {
    const router = useRouter()
    const [searchInput, setSearchInput] = useState(defaultValue ?? '')
    const handleSearchEnter = () => {
        if(searchInput){
            router.push('/festas?q='+encodeURIComponent(searchInput))
        }
    }
    return(
        <Input
            placeholder="Buscar"
            icon={faMagnifyingGlass}
            value={searchInput}
            onChange={t => setSearchInput(t)}
            onEnter={handleSearchEnter}
        />
    )
}