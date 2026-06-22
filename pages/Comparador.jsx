import { useState } from 'react'
import { useFuelContext } from '../src/hooks/useFuelContext'
import { useVehicleContext } from '../src/hooks/useVehicleContext'
import { calcularCustoAnual } from '../src/services/costCalculator'

function formatCurrency(value) {
  return Number(value).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

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
      <p className="mb-2 text-sm font-bold uppercase text-[#22C55E]">
        Comparador
      </p>
      <h1 className="mb-6 text-3xl font-bold text-[#0F172A]">
        Comparador de Custos
      </h1>

      {loading && (
        <p role="status" className="text-[#334155]">
          Carregando dados do comparador...
        </p>
      )}

      {error && (
        <p role="alert" className="font-semibold text-[#DC2626]">
          {error}
        </p>
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

            <button
              type="submit"
              disabled={
                !veiculoAId ||
                !veiculoBId ||
                Number(quilometragemAnual) <= 0
              }
              className="h-12 rounded-md bg-[#22C55E] px-6 font-semibold text-[#0F172A] hover:bg-[#16A34A] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Comparar
            </button>
          </form>

          <section className="mt-8" aria-labelledby="resultado-comparacao">
            <h2
              id="resultado-comparacao"
              className="mb-4 text-sm font-bold uppercase text-[#334155]"
            >
              Resultado
            </h2>
            <div className="rounded-lg border border-slate-200 bg-[#F8FAFC] p-6 text-center text-[#334155]">
              {comparacao?.error ? (
                <p role="alert" className="font-semibold text-[#DC2626]">
                  {comparacao.error}
                </p>
              ) : comparacao ? (
                <div role="status" className="space-y-2">
                  <p>
                    {veiculoA.marca} {veiculoA.modelo}:{' '}
                    <strong>{formatCurrency(comparacao.resultadoA.total)}</strong>
                  </p>
                  <p>
                    {veiculoB.marca} {veiculoB.modelo}:{' '}
                    <strong>{formatCurrency(comparacao.resultadoB.total)}</strong>
                  </p>
                </div>
              ) : (
                'Selecione dois veículos para visualizar a comparação.'
              )}
            </div>
          </section>
        </div>
      )}
    </section>
  )
}

export default Comparador
