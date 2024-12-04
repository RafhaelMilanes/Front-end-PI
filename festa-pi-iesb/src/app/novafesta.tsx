"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "./input";
import { Button } from "./button";
import { faFileAlt, faMoneyBillWave, faListAlt } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export const NovaFesta = () => {
  const router = useRouter();
  const [titleField, setTitleField] = useState("");
  const [descriptionField, setDescriptionField] = useState("");
  const [valueField, setValueField] = useState("");
  const [rulesField, setRulesField] = useState("");

  const handleEnterButton = () => {
    router.replace("/home");
  };

  return (
    <>
      <Input
        label="Título:"
        placeholder="Digite o título da festa"
        icon={faFileAlt}
        value={titleField}
        onChange={(t) => setTitleField(t)}
      />
      <Input
        label="Descrição:"
        placeholder="Digite a descrição da festa"
        value={descriptionField}
        onChange={(t) => setDescriptionField(t)}
      />
      <Input
        label="Valor:"
        placeholder="Digite o valor da entrada"
        icon={faMoneyBillWave}
        value={valueField}
        onChange={(t) => setValueField(t)}
      />
      <Input
        label="Regras:"
        placeholder="Digite as regras da festa"
        icon={faListAlt}
        value={rulesField}
        onChange={(t) => setRulesField(t)}
      />
      <Button label="Criar festa" onClick={handleEnterButton} size={1} />
    </>
  );
};
