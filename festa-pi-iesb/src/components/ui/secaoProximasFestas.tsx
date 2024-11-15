function SecaoProximasFestas() {
  const items = [
    {
      nome: "Festival de Música",
      data: "31/12/24",
      descricao:
        "Descrição: Lorem ipsum dolor sit amet. Ut reprehenderit quidem ut soluta nesciunt a explicabo nihil eum fuga nisi qui aspernatur laboriosam qui pariatur accusamus est similique quia. Vel quis officiis et repellat voluptatem qui culpa voluptatibus. Vel dolor labore aut nisi voluptas sit eaque similique vel iure facere ea molestias veritatis qui nulla ullam. ",
      valor: 230,
    },
    {
      nome: "Festival de Música",
      data: "31/12/24",
      descricao:
        "Descrição: Lorem ipsum dolor sit amet. Ut reprehenderit quidem ut soluta nesciunt a explicabo nihil eum fuga nisi qui aspernatur laboriosam qui pariatur accusamus est similique quia. Vel quis officiis et repellat voluptatem qui culpa voluptatibus. Vel dolor labore aut nisi voluptas sit eaque similique vel iure facere ea molestias veritatis qui nulla ullam. ",
      valor: 230,
    },
    {
      nome: "Festival de Música",
      data: "31/12/24",
      descricao:
        "Descrição: Lorem ipsum dolor sit amet. Ut reprehenderit quidem ut soluta nesciunt a explicabo nihil eum fuga nisi qui aspernatur laboriosam qui pariatur accusamus est similique quia. Vel quis officiis et repellat voluptatem qui culpa voluptatibus. Vel dolor labore aut nisi voluptas sit eaque similique vel iure facere ea molestias veritatis qui nulla ullam. ",
      valor: 230,
    },
  ];
  return (
    <section className="py-8">
      <h2 className="ps-10 text-5xl text-white  ">Festas Próximas:</h2>
      <ul className="grid w-full grid-rows-[repeat(auto-fit,minmax(300px,1fr))] grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
        {items.map((item, index) => (
          <li className="bg-white mx-10 my-8 rounded-3xl" key={index}>
            <div className="bg-[#97a2d7] text-white px-5 py-4 rounded-t-3xl">
              <h3 className="text-3xl">{item.nome}</h3>
              <p className="text-xl">{item.data}</p>
            </div>
            <div className="px-5 py-5">
              <p>{item.descricao}</p>
              <p className="text-3xl pt-7">Valor: R${item.valor},00</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default SecaoProximasFestas;
