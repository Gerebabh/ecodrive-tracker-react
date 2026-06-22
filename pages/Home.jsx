import DashboardStat from '../components/DashboardStat'
import { ButtonLink } from '../components/ui/Button'
import StatusMessage from '../components/ui/StatusMessage'
import { useFuelContext } from '../src/hooks/useFuelContext'
import { useVehicleContext } from '../src/hooks/useVehicleContext'

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
  const tiposMotorizacao = new Set(
    veiculos.map((veiculo) => veiculo.tipo),
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
          Compare veículos elétricos e de combustão usando seus custos reais de
          energia, combustível e impostos.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <ButtonLink to="/cadastro">
            Cadastrar veículo
          </ButtonLink>
          <ButtonLink to="/comparador" variant="secondary">
            Comparar custos
          </ButtonLink>
        </div>
      </div>

      <div className="px-4 py-6 sm:px-8 sm:py-8 lg:px-10">
        {loading && (
          <StatusMessage>
            Carregando resumo...
          </StatusMessage>
        )}

        {error && (
          <StatusMessage type="error">{error}</StatusMessage>
        )}

        {!loading && !error && (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <DashboardStat
              value={veiculos.length}
              label="Veículos cadastrados"
              icon="vehicle"
            />
            <DashboardStat
              value={eletricos}
              label="Veículos elétricos"
              icon="energy"
              highlight
            />
            <DashboardStat
              value={combustiveis.length}
              label="Preços monitorados"
              icon="price"
            />
            <DashboardStat
              value={tiposMotorizacao}
              label="Tipos de motorização"
              icon="consumption"
            />
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
