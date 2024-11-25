function AgendaMinimizada() {
    const items = [{nome: "festa 1", data: "23/12/24"}, {nome: "festa 2", data: "25/12/24"}]
    return(
        <div className="flex flex-row items-center py-2 bg-white">
            <h2 className="mx-14">Próximas Festas:</h2>
            <ul className="flex flex-row justify-around w-4/6">
                {items.map((item, index) => (
                    <li key={index}>
                            <p>{item.nome}</p>
                            <p>{item.data}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AgendaMinimizada