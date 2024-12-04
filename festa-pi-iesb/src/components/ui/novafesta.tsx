"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "./inputFesta";
import { Button } from "./button";
import { faFileAlt, faMoneyBillWave, faListAlt, faCalendarAlt, faUsers } from "@fortawesome/free-solid-svg-icons";

export const NovaFesta = () => {
  const router = useRouter();
  const [titleField, setTitleField] = useState("");
  const [descriptionField, setDescriptionField] = useState("");
  const [valueField, setValueField] = useState("");
  const [rulesField, setRulesField] = useState("");
  const [dateField, setDateField] = useState("");
  const [participantsField, setParticipantsField] = useState("");

  const [errors, setErrors] = useState({});

  const validateFields = () => {
    const newErrors = {};

    if (!titleField) newErrors.title = "O título é obrigatório.";
    if (!descriptionField) newErrors.description = "A descrição é obrigatória.";
    if (!valueField) newErrors.value = "O valor é obrigatório.";
    if (isNaN(valueField)) newErrors.value = "O valor deve ser um número.";
    if (!dateField) newErrors.date = "A data do evento é obrigatória.";
    if (!rulesField) newErrors.rules = "As regras são obrigatórias.";
    if (!participantsField) newErrors.participants = "Os participantes são obrigatórios.";

    return newErrors;
  };

  const handleEnterButton = () => {
    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    
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
        error={errors.title}
      />
      <Input
        label="Descrição:"
        placeholder="Digite a descrição da festa"
        value={descriptionField}
        onChange={(t) => setDescriptionField(t)}
        error={errors.description}
      />
      <Input
        label="Valor:"
        placeholder="Digite o valor da entrada"
        icon={faMoneyBillWave}
        value={valueField}
        onChange={(t) => setValueField(t)}
        type="number" // Aceita apenas números
        error={errors.value}
      />
      <Input
        label="Regras:"
        placeholder="Digite as regras da festa"
        icon={faListAlt}
        value={rulesField}
        onChange={(t) => setRulesField(t)}
        error={errors.rules}
      />
      <Input
        label="Data do Evento:"
        placeholder="Digite a data do evento"
        icon={faCalendarAlt}
        value={dateField}
        onChange={(t) => setDateField(t)}
        type="date" // Aceita apenas datas
        error={errors.date}
      />
      <Input
        label="Participantes:"
        placeholder="Digite os participantes"
        icon={faUsers}
        value={participantsField}
        onChange={(t) => setParticipantsField(t)}
        error={errors.participants}
      />
      <Button label="Criar festa" onClick={handleEnterButton} size={1} />
    </>
  );
};
