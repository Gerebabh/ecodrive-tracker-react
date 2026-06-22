import { createContext, useEffect, useState } from 'react'
import { atualizarTodos, listar } from '../services/fuelService'

const FuelContext = createContext()

function FuelProvider({ children }) {
  const [combustiveis, setCombustiveis] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function carregarCombustiveis() {
      try {
        setLoading(true)
        setError('')

        const dados = await listar()
        setCombustiveis(dados)
      } catch {
        setError('Não foi possível carregar os combustíveis.')
      } finally {
        setLoading(false)
      }
    }

    carregarCombustiveis()
  }, [])

  async function editarCombustiveis(combustiveisAtualizados) {
    const dados = await atualizarTodos(combustiveisAtualizados)
    setCombustiveis(dados)
    return dados
  }

  function obterCombustivelPorTipo(tipo) {
    return combustiveis.find((combustivel) => combustivel.tipo === tipo)
  }

  function obterCombustivelDoVeiculo(veiculo) {
    return obterCombustivelPorTipo(veiculo.combustivel)
  }

  return (
    <FuelContext.Provider
      value={{
        combustiveis,
        loading,
        error,
        editarCombustiveis,
        obterCombustivelPorTipo,
        obterCombustivelDoVeiculo,
      }}
    >
      {children}
    </FuelContext.Provider>
  )
}

export { FuelContext, FuelProvider }
