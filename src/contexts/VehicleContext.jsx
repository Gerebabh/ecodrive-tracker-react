import { createContext, useEffect, useState } from 'react'
import { listar } from '../services/vehicleService'

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
        setError('Nao foi possivel carregar os veiculos.')
      } finally {
        setLoading(false)
      }
    }

    carregarVeiculos()
  }, [])

  return (
    <VehicleContext.Provider
      value={{ veiculos, setVeiculos, loading, error }}
    >
      {children}
    </VehicleContext.Provider>
  )
}

export { VehicleContext, VehicleProvider }
