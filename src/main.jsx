import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { FuelProvider } from './contexts/FuelContext.jsx'
import { VehicleProvider } from './contexts/VehicleContext.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FuelProvider>
      <VehicleProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </VehicleProvider>
    </FuelProvider>
  </StrictMode>,
)
