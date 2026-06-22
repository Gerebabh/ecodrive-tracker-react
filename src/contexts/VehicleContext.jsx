import { createContext, useEffect, useState } from 'react'
import { atualizar, criar, listar, remover } from '../services/vehicleService'

const VehicleContext = createContext()

function VehicleProvider({ children }) {
  const [veiculos, setVeiculos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function carregarVeiculos() {
      try {
        setLoading(true)
        setError('')

        const dados = await listar()
        setVeiculos(dados)
      } catch {
        setError('Não foi possível carregar os veículos.')
      } finally {
        setLoading(false)
      }
    }

    carregarVeiculos()
  }, [])

  async function cadastrarVeiculo(veiculo) {
    const veiculoCriado = await criar(veiculo)
    setVeiculos((veiculosAtuais) => [...veiculosAtuais, veiculoCriado])
    return veiculoCriado
  }

  async function excluirVeiculo(id) {
    await remover(id)
    setVeiculos((veiculosAtuais) =>
      veiculosAtuais.filter((veiculo) => veiculo.id !== id),
    )
  }

  async function editarVeiculo(id, veiculo) {
    const veiculoAtualizado = await atualizar(id, { ...veiculo, id })
    setVeiculos((veiculosAtuais) =>
      veiculosAtuais.map((veiculoAtual) =>
        veiculoAtual.id === id ? veiculoAtualizado : veiculoAtual,
      ),
    )
    return veiculoAtualizado
  }

  return (
    <VehicleContext.Provider
      value={{
        veiculos,
        setVeiculos,
        loading,
        error,
        cadastrarVeiculo,
        excluirVeiculo,
        editarVeiculo,
      }}
    >
      {children}
    </VehicleContext.Provider>
  )
}

export { VehicleContext, VehicleProvider }
