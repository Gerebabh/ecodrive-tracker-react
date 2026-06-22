import { useState } from 'react'
import ComparisonResult from '../components/ComparisonResult'
import { Button } from '../components/ui/Button'
import PageHeader from '../components/ui/PageHeader'
import StatusMessage from '../components/ui/StatusMessage'
import { useFuelContext } from '../src/hooks/useFuelContext'
import { useVehicleContext } from '../src/hooks/useVehicleContext'
import { calcularCustoAnual } from '../src/services/costCalculator'

function Comparador() {
  const [veiculoAId, setVeiculoAId] = useState('')
  const [veiculoBId, setVeiculoBId] = useState('')
  const [quilometragemAnual, setQuilometragemAnual] = useState('15000')
  const [comparacaoIniciada, setComparacaoIniciada] = useState(false)
  const {
    error: fuelError,
    loading: fuelLoading,
    obterCombustivelDoVeiculo,
  } = useFuelContext()
  const {
    veiculos,
    error: vehicleError,
    loading: vehicleLoading,
  } = useVehicleContext()

  const loading = fuelLoading || vehicleLoading
  const error = fuelError || vehicleError
  const veiculoA = veiculos.find((veiculo) => veiculo.id === veiculoAId)
  const veiculoB = veiculos.find((veiculo) => veiculo.id === veiculoBId)

  function handleVehicleAChange(event) {
    setVeiculoAId(event.target.value)
  }

  function handleVehicleBChange(event) {
    setVeiculoBId(event.target.value)
  }

  function handleSubmit(event) {
    event.preventDefault()
    setComparacaoIniciada(true)
  }

  const comparacao = (() => {
    if (!comparacaoIniciada || !veiculoA || !veiculoB) {
      return null
    }

    try {
      return {
        resultadoA: calcularCustoAnual(
          veiculoA,
          obterCombustivelDoVeiculo(veiculoA),
          quilometragemAnual,
        ),
        resultadoB: calcularCustoAnual(
          veiculoB,
          obterCombustivelDoVeiculo(veiculoB),
          quilometragemAnual,
        ),
        error: '',
      }
    } catch (calculationError) {
      return {
        resultadoA: null,
        resultadoB: null,
        error: calculationError.message,
      }
    }
  })()

  return (
    <section className="rounded-lg bg-white p-4 shadow-sm sm:p-6 lg:p-8">
      <PageHeader
        eyebrow="Comparador"
        title="Comparador de Custos"
        className="mb-6"
      />

      {loading && (
        <StatusMessage>
          Carregando dados do comparador...
        </StatusMessage>
      )}

      {error && (
        <StatusMessage type="error">{error}</StatusMessage>
      )}

      {!loading && !error && (
        <div>
          <form
            onSubmit={handleSubmit}
            className="grid gap-4 rounded-lg bg-[#F8FAFC] p-4 md:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-end"
          >
            <div>
              <label
                htmlFor="veiculo-a"
                className="mb-1 block text-sm font-semibold uppercase text-[#334155]"
              >
                Veículo A
              </label>
              <select
                id="veiculo-a"
                value={veiculoAId}
                onChange={handleVehicleAChange}
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-3 text-[#334155] outline-none focus:border-[#22C55E] focus:ring-2 focus:ring-green-100"
              >
                <option value="" disabled>
                  Selecione um veículo
                </option>
                {veiculos.map((veiculo) => (
                  <option
                    key={veiculo.id}
                    value={veiculo.id}
                    disabled={veiculo.id === veiculoBId}
                  >
                    {veiculo.marca} {veiculo.modelo}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="veiculo-b"
                className="mb-1 block text-sm font-semibold uppercase text-[#334155]"
              >
                Veículo B
              </label>
              <select
                id="veiculo-b"
                value={veiculoBId}
                onChange={handleVehicleBChange}
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-3 text-[#334155] outline-none focus:border-[#22C55E] focus:ring-2 focus:ring-green-100"
              >
                <option value="" disabled>
                  Selecione um veículo
                </option>
                {veiculos.map((veiculo) => (
                  <option
                    key={veiculo.id}
                    value={veiculo.id}
                    disabled={veiculo.id === veiculoAId}
                  >
                    {veiculo.marca} {veiculo.modelo}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="quilometragem-anual"
                className="mb-1 block text-sm font-semibold uppercase text-[#334155]"
              >
                Quilometragem anual
              </label>
              <input
                id="quilometragem-anual"
                type="number"
                min="1"
                value={quilometragemAnual}
                onChange={(event) =>
                  setQuilometragemAnual(event.target.value)
                }
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-3 text-[#334155] outline-none focus:border-[#22C55E] focus:ring-2 focus:ring-green-100"
              />
            </div>

            <Button
              type="submit"
              disabled={
                !veiculoAId ||
                !veiculoBId ||
                Number(quilometragemAnual) <= 0
              }
              className="h-12 px-6"
            >
              Comparar
            </Button>
          </form>

          <section className="mt-8" aria-labelledby="resultado-comparacao">
            <h2
              id="resultado-comparacao"
              className="mb-4 text-sm font-bold uppercase text-[#334155]"
            >
              Resultado
            </h2>
            <div className="border border-slate-200 bg-[#F8FAFC] p-4 sm:p-6">
              {comparacao?.error ? (
                <StatusMessage type="error" className="text-center">
                  {comparacao.error}
                </StatusMessage>
              ) : comparacao ? (
                <ComparisonResult
                  veiculoA={veiculoA}
                  veiculoB={veiculoB}
                  resultadoA={comparacao.resultadoA}
                  resultadoB={comparacao.resultadoB}
                  quilometragemAnual={quilometragemAnual}
                />
              ) : (
                <p className="py-4 text-center text-[#334155]">
                  Selecione dois veículos para visualizar a comparação.
                </p>
              )}
            </div>
          </section>
        </div>
      )}
    </section>
  )
}

export default Comparador
