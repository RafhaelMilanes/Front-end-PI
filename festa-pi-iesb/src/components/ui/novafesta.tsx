"use client";

import { useRouter } from "next/navigation";
import { useState, useContext } from "react";
import { Input } from "./inputFesta";
import { Button } from "./button";
import {
  faFileAlt,
  faMoneyBillWave,
  faListAlt,
  faCalendarAlt,
  faUsers,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FestasContext } from "@/context/FestaContext";
import { AuthContext } from "@/context/AuthContext";

export const NovaFesta = () => {
  const router = useRouter();
  const contextFesta = useContext(FestasContext);
  const contextAuth = useContext(AuthContext); // Usando o AuthContext para obter o ID do usuário logado
  const [titleField, setTitleField] = useState("");
  const [descriptionField, setDescriptionField] = useState("");
  const [valueField, setValueField] = useState("");
  const [rulesField, setRulesField] = useState("");
  const [rulesArray, setRulesArray] = useState<string[]>([]);
  const [dateField, setDateField] = useState("");
  const [participantsField, setParticipantsField] = useState("");
  const [participantsArray, setParticipantsArray] = useState<number[]>([]); // Alterado para number[]
  const [participantsNamesArray, setParticipantsNamesArray] = useState<string[]>([]); // Adicionado para armazenar os nomes dos participantes

  const [errors, setErrors] = useState({});
  const [showError, setShowError] = useState(false);

  const validateFields = () => {
    const newErrors = {};

    if (!titleField) newErrors.title = "O título é obrigatório.";
    if (!descriptionField) newErrors.description = "A descrição é obrigatória.";
    if (!valueField) newErrors.value = "O valor é obrigatório.";
    if (isNaN(Number(valueField))) newErrors.value = "O valor deve ser um número.";
    if (!dateField) newErrors.date = "A data do evento é obrigatória.";
    if (rulesArray.length === 0) newErrors.rules = "As regras são obrigatórias.";
    if (participantsArray.length === 0) newErrors.participants = "Os participantes são obrigatórios.";

    return newErrors;
  };

  const handleAddRule = () => {
    if (rulesField) {
      setRulesArray([...rulesArray, rulesField]);
      setRulesField("");
    }
  };

  const handleRemoveRule = (index: number) => {
    setRulesArray(rulesArray.filter((_, i) => i !== index));
  };

  const handleAddParticipant = async () => {
    if (participantsField) {
      const resposta = await contextFesta?.verificarParticipante(participantsField);
      if (resposta.sucesso) {
        setParticipantsArray([...participantsArray, resposta.dados.id]); // Armazenar o ID do usuário
        setParticipantsNamesArray([...participantsNamesArray, resposta.dados.nome]); // Armazenar o nome do usuário
        setParticipantsField("");
        setShowError(false);
      } else {
        setErrors(prevErrors => ({ ...prevErrors, participants: "Usuário não encontrado." }));
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
          setErrors(prevErrors => ({ ...prevErrors, participants: "" }));
        }, 3000); // Remove a mensagem de erro após 3 segundos
      }
    }
  };

  const handleRemoveParticipant = (index: number) => {
    setParticipantsArray(participantsArray.filter((_, i) => i !== index));
    setParticipantsNamesArray(participantsNamesArray.filter((_, i) => i !== index));
  };

  const handleEnterButton = async () => {
    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const usuarioId = contextAuth?.usuario?.id; // Obtendo o ID do usuário logado

    const novaFesta = {
      nome: titleField,
      descricao: descriptionField,
      valor: Number(valueField),
      regras: rulesArray,
      data: dateField,
      participantes: [],
      convidados: participantsArray,
      organizador: usuarioId, // Adicionando o ID do usuário logado como organizador
    };

    const resposta = await contextFesta?.criarFesta(novaFesta);

    if (resposta && resposta.sucesso) {
      contextFesta?.setFestas([])
      if (usuarioId) {
        await contextFesta?.addParticipante(usuarioId, resposta.dados.id);
      }

      router.replace("/festas");
    } else {
      setErrors(prevErrors => ({ ...prevErrors, form: "Erro ao criar festa." }));
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
        setErrors(prevErrors => ({ ...prevErrors, form: "" }));
      }, 3000); // Remove a mensagem de erro após 3 segundos
    }
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
        type="number"
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
      <button
        className="p-4 bg-[#97a2d7] text-white rounded-xl"
        onClick={handleAddRule}
      >
        Adicionar Regra
      </button>
      <ul className="px-4 mb-4">
        {rulesArray.map((rule, index) => (
          <li key={index} onClick={() => handleRemoveRule(index)}>
            {rule}
          </li>
        ))}
      </ul>
      <Input
        label="Data do Evento:"
        placeholder="Digite a data do evento"
        icon={faCalendarAlt}
        value={dateField}
        onChange={(t) => setDateField(t)}
        type="date"
        error={errors.date}
      />
      <Input
        label="Participantes:"
        placeholder="Digite o nome do participante"
        icon={faUsers}
        value={participantsField}
        onChange={(t) => setParticipantsField(t)}
        error={showError ? errors.participants : ""}
      />
      <button
        className="p-4 bg-[#97a2d7] text-white rounded-xl"
        onClick={handleAddParticipant}
      >
        Adicionar Participante
      </button>
      <ul className="px-4">
        {participantsNamesArray.map((participant, index) => (
          <li key={index} onClick={() => handleRemoveParticipant(index)}>
            {participant}
          </li>
        ))}
      </ul>
      <Button label="Criar festa" onClick={handleEnterButton} size={1} />
    </>
  );
};
