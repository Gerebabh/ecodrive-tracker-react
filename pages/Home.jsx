import { Link } from 'react-router'
import { useFuelContext } from '../src/hooks/useFuelContext'
import { useVehicleContext } from '../src/hooks/useVehicleContext'

function StatItem({ value, label, highlight = false }) {
  return (
    <div className="border border-slate-200 bg-[#F8FAFC] p-5">
      <p
        className={`text-2xl font-bold ${
          highlight ? 'text-[#16A34A]' : 'text-[#0F172A]'
        }`}
      >
        {value}
      </p>
      <p className="mt-1 text-sm text-[#334155]">{label}</p>
    </div>
  )
}

function Home() {
  const {
    veiculos,
    loading: vehicleLoading,
    error: vehicleError,
  } = useVehicleContext()
  const {
    combustiveis,
    loading: fuelLoading,
    error: fuelError,
  } = useFuelContext()

  const loading = vehicleLoading || fuelLoading
  const error = vehicleError || fuelError
  const eletricos = veiculos.filter(
    (veiculo) => veiculo.tipo === 'eletrico',
  ).length
  const perfisConsumo = new Set(
    veiculos.map((veiculo) => veiculo.unidadeConsumo),
  ).size

  return (
    <section className="overflow-hidden rounded-lg bg-white shadow-sm">
      <div className="border-b border-slate-200 px-4 py-8 sm:px-8 sm:py-10 lg:px-10">
        <p className="mb-2 text-sm font-bold uppercase text-[#22C55E]">
          Gestão veicular
        </p>
        <h1 className="max-w-3xl text-3xl font-bold text-[#0F172A] sm:text-4xl">
          Controle Inteligente de Custos Veiculares
        </h1>
        <p className="mt-3 max-w-2xl text-base text-[#334155] sm:text-lg">
          Compare veículos elétricos e a combustão usando seus custos reais de
          energia, combustível e impostos.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/cadastro"
            className="inline-flex min-h-12 items-center justify-center rounded-md bg-[#22C55E] px-5 font-semibold text-[#0F172A] hover:bg-[#16A34A]"
          >
            Cadastrar veículo
          </Link>
          <Link
            to="/comparador"
            className="inline-flex min-h-12 items-center justify-center rounded-md border border-slate-300 px-5 font-semibold text-[#334155] hover:bg-[#F1F5F9]"
          >
            Comparar custos
          </Link>
        </div>
      </div>

      <div className="px-4 py-6 sm:px-8 sm:py-8 lg:px-10">
        {loading && (
          <p role="status" className="text-[#334155]">
            Carregando resumo...
          </p>
        )}

        {error && (
          <p role="alert" className="font-semibold text-[#DC2626]">
            {error}
          </p>
        )}

        {!loading && !error && (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <StatItem
              value={veiculos.length}
              label="Veículos cadastrados"
            />
            <StatItem
              value={eletricos}
              label="Veículos elétricos"
              highlight
            />
            <StatItem
              value={combustiveis.length}
              label="Preços monitorados"
            />
            <StatItem value={perfisConsumo} label="Perfis de consumo" />
          </div>
        )}

        <div className="mt-6 border-l-4 border-[#22C55E] bg-green-50 px-4 py-3 text-[#334155]">
          <strong className="text-[#0F172A]">Dica:</strong> compare dois
          veículos para descobrir qual possui o menor custo anual.
        </div>
      </div>
    </section>
  )
}

export default Home
