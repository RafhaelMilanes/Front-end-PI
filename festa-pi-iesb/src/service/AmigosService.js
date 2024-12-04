import axios from "axios";

const url = "http://localhost:3000"

async function buscarUsuarios(usuarioId) {
  try {
    const usuarioResponse = await axios.get(
      `http://localhost:3000/users/${usuarioId}`
    );
    const usuario = usuarioResponse.data;
    const amigosIds = usuario.amigos;
    const requests = amigosIds.map((id) =>
      axios.get(`http://localhost:3000/users/${id}`)
    );
    const responses = await Promise.all(requests);
    const amigos = responses.map((response) => response.data);
    return amigos;
  } catch (error) {
    console.error("Erro ao buscar amigos:", error);
    return [];
  }
}
async function adicinarAmigo(id, idNovoAmigo) {
  try {
    const responseUsuario = await axios.get(
      `http://localhost:3000/users/${id}`
    );
    const dadosUsuario = responseUsuario.data;
    const amigosAtuais = dadosUsuario.amigos || [];
    if (amigosAtuais.includes(idNovoAmigo)) {
      return { sucesso: false, msg: "Amigo já está na lista." };
    }
    const novosAmigos = [...amigosAtuais, idNovoAmigo];
    await axios.patch(`http://localhost:3000/users/${id}`, {
      amigos: novosAmigos,
    });
    const responseNovoAmigo = await axios.get(
      `http://localhost:3000/users/${idNovoAmigo}`
    );
    const dadosNovoAmigo = responseNovoAmigo.data;
    const novosAmigosNovoAmigo = dadosNovoAmigo.amigos.includes(id)
      ? dadosNovoAmigo.amigos
      : [...dadosNovoAmigo.amigos, id];
    await axios.patch(`http://localhost:3000/users/${idNovoAmigo}`, {
      amigos: novosAmigosNovoAmigo,
    });
    return { sucesso: true, msg: "", dados: { id, idNovoAmigo } };
  } catch (error) {
    if (error.response) {
      return { sucesso: false, msg: error.response.data };
    } else {
      return { sucesso: false, msg: error.message };
    }
  }
}

async function buscarTodosUsuarios(usuarioId) {
  try {
    const responseUsuario = await axios.get(`${url}/users/${usuarioId}`);
    const usuario = responseUsuario.data;
    const amigosIds = usuario.amigos || [];
    const response = await axios.get(`${url}/users`);
    const usuarios = response.data
      .filter(
        (usuario) => usuario.id !== usuarioId && !amigosIds.includes(usuario.id)
      )
      .map((usuario) => {
        const { senha, ...informacoesSemSenha } = usuario;
        return informacoesSemSenha;
      });
    return { sucesso: true, dados: usuarios, msg: "" };
  } catch (error) {
    if (error.response) {
      return { sucesso: false, msg: error.response.data };
    } else {
      return { sucesso: false, msg: error.message };
    }
  }
}

export { buscarUsuarios, adicinarAmigo, buscarTodosUsuarios };
