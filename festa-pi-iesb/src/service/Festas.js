import axios from "axios";

const url = import.meta.env.VITE_API_URL;

function adicionar(dados) {
  return axios
    .post(`${url}/festas`, {
      nome: dados.nome,
      data: dados.data,
      regras: dados.regras,
      descricao: dados.descricao,
      valor: dados.valor,
    })
    .then((response) => {
      return { sucesso: true, dados: response.data };
    })
    .catch((error) => {
      if (error.response) {
        return { sucesso: false, mensagem: error.response.data };
      } else {
        return { sucesso: false, mensagem: "Ocorreu um erro!" };
      }
    });
}

export {adicionar}