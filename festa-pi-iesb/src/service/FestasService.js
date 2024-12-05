import axios from "axios";

const url = "http://localhost:3000";

function buscarTodos() {
  return axios
    .get(`${url}/festas`)
    .then((response) => {
      return { sucesso: true, mensagem: "", dados: response.data };
    })
    .catch((error) => {
      return { sucesso: false, mensagem: "Ocorreu um erro!", dados: null };
    });
}

async function buscarUm(festaId) {
  try {
    const responseFesta = await axios.get(`${url}/festas/${festaId}`);
    const festa = responseFesta.data;
    const participantesDetalhes = [];
    let organizadorDetalhes = null;
    if (Array.isArray(festa.participantes)) {
      const participantesRequests = festa.participantes.map((id) =>
        axios.get(`${url}/users/${id}`)
      );
      const participantesResponses = await Promise.all(participantesRequests);
      participantesResponses.forEach((response) => {
        participantesDetalhes.push(response.data);
      });
    }
    if (typeof festa.organizador === "number") {
      const responseOrganizador = await axios.get(
        `${url}/users/${festa.organizador}`
      );
      organizadorDetalhes = responseOrganizador.data;
    }
    return {
      sucesso: true,
      dados: { ...festa, participantesDetalhes, organizadorDetalhes },
      msg: "",
    };
  } catch (error) {
    if (error.response) {
      return { sucesso: false, msg: error.response.data };
    } else {
      return { sucesso: false, msg: error.message };
    }
  }
}

function adicionar(dados) {
  return axios
    .post(`${url}/festas`, {
      nome: dados.nome,
      data: dados.data,
      regras: dados.regras,
      descricao: dados.descricao,
      valor: dados.valor,
      organizador: dados.organizador,
      participantes: dados.participantes,
      convidados: dados.convidados,
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

async function adicionarParticipante(usuarioId, festaId) {
  try {
    const responseUsuario = await axios.get(
      `http://localhost:3000/users/${usuarioId}`
    );
    const dadosUsuario = responseUsuario.data;
    const festasAtuais = dadosUsuario.festas || [];

    if (festasAtuais.includes(festaId)) {
      return {
        sucesso: false,
        msg: "Usuário já está participando desta festa.",
      };
    }

    const novasFestas = [...festasAtuais, festaId];
    await axios.patch(`http://localhost:3000/users/${usuarioId}`, {
      festas: novasFestas,
    });

    // Atualizar o perfil da festa com o ID do usuário
    const responseFesta = await axios.get(
      `http://localhost:3000/festas/${festaId}`
    );
    const dadosFesta = responseFesta.data;
    const participantesAtuais = dadosFesta.participantes || [];

    if (participantesAtuais.includes(usuarioId)) {
      return { sucesso: false, msg: "Festa já possui este participante." };
    }

    const novosParticipantes = [...participantesAtuais, usuarioId];
    await axios.patch(`http://localhost:3000/festas/${festaId}`, {
      participantes: novosParticipantes,
    });

    return { sucesso: true, msg: "", dados: { usuarioId, festaId } };
  } catch (error) {
    if (error.response) {
      return { sucesso: false, msg: error.response.data };
    } else {
      return { sucesso: false, msg: error.message };
    }
  }
}

async function aceitarConvite(usuarioId, festaId) {
  try {
    const responseFesta = await axios.get(
      `http://localhost:3000/festas/${festaId}`
    );
    const dadosFesta = responseFesta.data;
    const convidadosAtuais = dadosFesta.convidados || [];
    const novosConvidados = convidadosAtuais.filter((id) => id !== usuarioId);
    await axios.patch(`http://localhost:3000/festas/${festaId}`, {
      convidados: novosConvidados,
    });
    const participantesAtuais = dadosFesta.participantes || [];
    const novosParticipantes = [...participantesAtuais, usuarioId];
    await axios.patch(`http://localhost:3000/festas/${festaId}`, {
      participantes: novosParticipantes,
    });
    const responseUsuario = await axios.get(
      `http://localhost:3000/users/${usuarioId}`
    );
    const dadosUsuario = responseUsuario.data;
    const festasAtuais = dadosUsuario.festas || [];
    const novasFestas = [...festasAtuais, festaId];
    await axios.patch(`http://localhost:3000/users/${usuarioId}`, {
      festas: novasFestas,
    });
    return { sucesso: true, msg: "", dados: { usuarioId, festaId } };
  } catch (error) {
    if (error.response) {
      return { sucesso: false, msg: error.response.data };
    } else {
      return { sucesso: false, msg: error.message };
    }
  }
}

async function recusarConvite(usuarioId, festaId) {
  try {
    const responseFesta = await axios.get(
      `http://localhost:3000/festas/${festaId}`
    );
    const dadosFesta = responseFesta.data;
    const convidadosAtuais = dadosFesta.convidados || [];
    const novosConvidados = convidadosAtuais.filter((id) => id !== usuarioId);
    await axios.patch(`http://localhost:3000/festas/${festaId}`, {
      convidados: novosConvidados,
    });
    return { sucesso: true, msg: "", dados: { usuarioId, festaId } };
  } catch (error) {
    if (error.response) {
      return { sucesso: false, msg: error.response.data };
    } else {
      return { sucesso: false, msg: error.message };
    }
  }
}

async function buscarConvites(usuarioId) {
  try {
    const responseFestas = await axios.get(`${url}/festas`);
    const todasFestas = responseFestas.data;
    const festasConvidado = todasFestas.filter((festa) =>
      festa.convidados.includes(usuarioId)
    );
    return { sucesso: true, dados: festasConvidado, msg: "" };
  } catch (error) {
    if (error.response) {
      return { sucesso: false, msg: error.response.data, dados: [] };
    } else {
      return { sucesso: false, msg: error.message, dados: [] };
    }
  }
}

async function buscarFestasParticipando(usuarioId) {
  try {
    const responseUsuario = await axios.get(
      `http://localhost:3000/users/${usuarioId}`
    );
    const dadosUsuario = responseUsuario.data;
    const festasIds = dadosUsuario.festas || [];
    if (festasIds.length === 0) {
      return {
        sucesso: true,
        dados: [],
        msg: "O usuário não está participando de nenhuma festa.",
      };
    }
    const requests = festasIds.map((id) =>
      axios.get(`http://localhost:3000/festas/${id}`)
    );
    const responses = await Promise.all(requests);
    const festasParticipando = responses.map((response) => response.data);
    return { sucesso: true, dados: festasParticipando, msg: "" };
  } catch (error) {
    if (error.response) {
      return { sucesso: false, msg: error.response.data };
    } else {
      return { sucesso: false, msg: error.message };
    }
  }
}

async function verificarUsuario(nomeUsuario) {
  try {
    const response = await axios.get(`${url}/users?nome=${nomeUsuario}`);
    const usuario = response.data[0];
    if (usuario) {
      return { sucesso: true, dados: usuario, msg: "" };
    } else {
      return { sucesso: false, msg: "Usuário não encontrado." };
    }
  } catch (error) {
    if (error.response) {
      return { sucesso: false, msg: error.response.data };
    } else {
      return { sucesso: false, msg: error.message };
    }
  }
}

export {
  adicionar,
  buscarTodos,
  buscarUm,
  adicionarParticipante,
  recusarConvite,
  buscarConvites,
  aceitarConvite,
  buscarFestasParticipando,
  verificarUsuario
};
