import Imagem from "@/components/ui/imagem";

function Page() {
  const item = {
    nome: "Festival de Música",
    data: "31/12/24",
    regras: ["","",""],
    descricao:
      "Lorem ipsum dolor sit amet. Ut reprehenderit quidem ut soluta nesciunt a explicabo nihil eum fuga nisi qui aspernatur laboriosam qui pariatur accusamus est similique quia. Vel quis officiis et repellat voluptatem qui culpa voluptatibus. Vel dolor labore aut nisi voluptas sit eaque similique vel iure facere ea molestias veritatis qui nulla ullam. ",
    valor: 230,
  };
  return (
    <>
      <Imagem titulo={item.nome} data={item.data}/>
      <section className="px-8 mt-20">
        <h2 className="text-4xl mb-4">Descrição</h2>
        <p>
         {item.descricao}
        </p>
      </section>
    </>
  );
}

export default Page;
