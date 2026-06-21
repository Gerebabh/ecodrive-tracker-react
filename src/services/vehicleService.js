const url = 'http://localhost:3000/veiculos'

async function validarResposta(response) {
  if (!response.ok) {
    throw new Error(`Erro na requisicao: ${response.status}`)
  }

  return response.json()
}

async function listar() {
  try {
    const response = await fetch(url)
    return await validarResposta(response)
  } catch (error) {
    console.error('Erro ao listar veiculos:', error.message)
    throw error
  }
}

async function criar(veiculo) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(veiculo),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    return await validarResposta(response)
  } catch (error) {
    console.error('Erro ao criar veiculo:', error.message)
    throw error
  }
}

async function atualizar(id, veiculo) {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(veiculo),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    return await validarResposta(response)
  } catch (error) {
    console.error('Erro ao atualizar veiculo:', error.message)
    throw error
  }
}

async function remover(id) {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: 'DELETE',
    })

    return await validarResposta(response)
  } catch (error) {
    console.error('Erro ao remover veiculo:', error.message)
    throw error
  }
}

export { atualizar, criar, listar, remover }
