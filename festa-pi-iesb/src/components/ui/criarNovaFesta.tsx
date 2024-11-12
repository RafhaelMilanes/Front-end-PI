import Link from "next/link";

function CriarNovaFesta() {
    return(
        <Link href="/nova_Festa" className="self-center py-8">
            <section>
                <div className="bg-[#97a2d7] text-white px-5 py-4 rounded-t-3xl">
                    <h3 className="text-3xl">Criar Nova Festa</h3>
                </div>
                <div className="flex items-center justify-center bg-white px-5 py-5 rounded-b-3xl">
                    <img width={120} src="/assets/images/add_icon.svg" alt="Icone de Adicionar"/>
                </div>
            </section>
        </Link>
    );
};

export default CriarNovaFesta