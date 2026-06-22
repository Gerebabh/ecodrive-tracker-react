const url = 'http://localhost:3000/combustiveis'

async function validarResposta(response) {
  if (!response.ok) {
    throw new Error(`Erro na requisição: ${response.status}`)
  }

  return response.json()
}

async function listar() {
  try {
    const response = await fetch(url)
    return await validarResposta(response)
  } catch (error) {
    console.error('Erro ao listar combustíveis:', error.message)
    throw error
  }
}

async function atualizar(id, combustivel) {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(combustivel),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    return await validarResposta(response)
  } catch (error) {
    console.error('Erro ao atualizar combustível:', error.message)
    throw error
  }
}

async function atualizarTodos(combustiveis) {
  return Promise.all(
    combustiveis.map((combustivel) =>
      atualizar(combustivel.id, combustivel),
    ),
  )
}

export { atualizarTodos, listar }
