import axios from "axios";

const url = "http://localhost:3000"

function buscarTodos() {
  return axios.get(`${url}/festas`)
  .then((response) => {
      return { sucesso: true, mensagem: "", dados: response.data };
    })
  .catch((error) => {
      return { sucesso: false, mensagem: "Ocorreu um erro!", dados: null };
  });
};

function buscarUm(id) {
  return axios.get(`${url}/festas/${id}`)
  .then((response) => {
      return { sucesso: true, dados: response.data, mensagem: "" };
  })
  .catch((error) => {
      return { sucesso: false,dados: null, mensagem: "Ocorreu um erro!" };
  });
};

function adicionar(dados) {
  return axios
    .post(`${url}/festas`, {
      nome: dados.nome,
      data: dados.data,
      regras: dados.regras,
      descricao: dados.descricao,
      valor: dados.valor,
      organizador: dados.organizador,
      participantes: dados.participantes
    })
    .then((response) => {
      return { sucesso: true, dados: response.data, mensagem: "" };
    })
    .catch((error) => {
      if (error.response) {
        return { sucesso: false, mensagem: error.response.data };
      } else {
        return { sucesso: false, mensagem: "Ocorreu um erro!" };
      }
    });
}

export {adicionar, buscarTodos, buscarUm}