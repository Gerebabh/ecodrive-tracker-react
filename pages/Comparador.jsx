import { useFuelContext } from '../src/hooks/useFuelContext'
import { useVehicleContext } from '../src/hooks/useVehicleContext'

function Comparador() {
  const { error: fuelError, loading: fuelLoading } = useFuelContext()
  const {
    veiculos,
    error: vehicleError,
    loading: vehicleLoading,
  } = useVehicleContext()

  const loading = fuelLoading || vehicleLoading
  const error = fuelError || vehicleError

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
            onSubmit={(event) => event.preventDefault()}
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
                defaultValue=""
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-3 text-[#334155] outline-none focus:border-[#22C55E] focus:ring-2 focus:ring-green-100"
              >
                <option value="" disabled>
                  Selecione um veículo
                </option>
                {veiculos.map((veiculo) => (
                  <option key={veiculo.id} value={veiculo.id}>
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
                defaultValue=""
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-3 text-[#334155] outline-none focus:border-[#22C55E] focus:ring-2 focus:ring-green-100"
              >
                <option value="" disabled>
                  Selecione um veículo
                </option>
                {veiculos.map((veiculo) => (
                  <option key={veiculo.id} value={veiculo.id}>
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
                defaultValue="15000"
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-3 text-[#334155] outline-none focus:border-[#22C55E] focus:ring-2 focus:ring-green-100"
              />
            </div>

            <button
              type="button"
              className="h-12 rounded-md bg-[#22C55E] px-6 font-semibold text-[#0F172A] hover:bg-[#16A34A]"
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
              Selecione dois veículos para visualizar a comparação.
            </div>
          </section>
        </div>
      )}
    </section>
  )
}

export default Comparador
