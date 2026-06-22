import { useContext } from 'react'
import { FuelContext } from '../contexts/FuelContext'

function useFuelContext() {
  const context = useContext(FuelContext)

  if (!context) {
    throw new Error(
      'useFuelContext deve ser utilizado dentro de FuelProvider.',
    )
  }

  return context
}

export { useFuelContext }
