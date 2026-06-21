import { Link } from 'react-router'
import VehicleTable from '../components/VehicleTable'
import { useVehicleContext } from '../src/hooks/useVehicleContext'

function Veiculos() {
  const { veiculos, loading, error } = useVehicleContext()

  return (
    <section className="min-w-0 rounded-lg bg-white p-4 shadow-sm sm:p-6 lg:p-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-sm font-bold uppercase text-[#22C55E]">
            Veículos
          </p>
          <h1 className="text-3xl font-bold text-[#0F172A]">
            Veículos cadastrados
          </h1>
        </div>

        <Link
          to="/cadastro"
          className="inline-flex items-center justify-center rounded-md bg-[#22C55E] px-5 py-3 font-semibold text-[#0F172A] hover:bg-[#16A34A]"
        >
          Novo veículo
        </Link>
      </div>

      {loading && (
        <p
          role="status"
          className="rounded-md bg-[#F1F5F9] px-4 py-6 text-center text-[#334155]"
        >
          Carregando veículos...
        </p>
      )}

      {!loading && error && (
        <p
          role="alert"
          className="rounded-md bg-[#FEE2E2] px-4 py-6 text-center text-[#DC2626]"
        >
          {error}
        </p>
      )}

      {!loading && !error && veiculos.length === 0 && (
        <div className="rounded-md border border-dashed border-[#CBD5E1] px-4 py-8 text-center">
          <p className="font-semibold text-[#0F172A]">
            Nenhum veículo cadastrado.
          </p>
          <p className="mt-1 text-sm text-[#334155]">
            Cadastre o primeiro veículo para iniciar as comparações.
          </p>
        </div>
      )}

      {!loading && !error && veiculos.length > 0 && (
        <VehicleTable veiculos={veiculos} />
      )}
    </section>
  )
}

export default Veiculos
