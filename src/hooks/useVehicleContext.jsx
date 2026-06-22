import { useContext } from 'react'
import { VehicleContext } from '../contexts/VehicleContext'

function useVehicleContext() {
  const context = useContext(VehicleContext)

  if (!context) {
    throw new Error(
      'useVehicleContext deve ser utilizado dentro de VehicleProvider.',
    )
  }

  return context
}

export { useVehicleContext }
