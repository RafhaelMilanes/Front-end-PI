import AgendaMinimizada from "@/components/ui/agendaMinimizada";
import NavBar from "@/components/ui/navBar";
import SecaoProximasFestas from "@/components/ui/secaoProximasFestas";

export default function Page() {
  return (
    <>
      <NavBar />
      <AgendaMinimizada />
      <div className="flex flex-col pt-10">
        <h1 className="self-center text-white text-7xl">Início</h1>
        <SecaoProximasFestas />
        <section>
          <h2>afcsjklfclhck</h2>
        </section>
      </div>
    </>
  );
}
