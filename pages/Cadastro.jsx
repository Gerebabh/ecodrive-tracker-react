import VehicleForm from '../src/forms/VehicleForm'
import { useParams } from 'react-router'
import PageHeader from '../components/ui/PageHeader'
import StatusMessage from '../components/ui/StatusMessage'
import { useVehicleContext } from '../src/hooks/useVehicleContext'

function Cadastro() {
  const { id } = useParams()
  const { veiculos, loading } = useVehicleContext()
  const veiculo = veiculos.find((item) => item.id === id)
  const isEditing = Boolean(id)

  if (isEditing && loading) {
    return (
      <StatusMessage className="p-8 text-center shadow-sm">
        Carregando veículo...
      </StatusMessage>
    )
  }

  if (isEditing && !veiculo) {
    return (
      <section className="rounded-lg bg-white p-8 text-center shadow-sm">
        <h1 className="text-2xl font-bold text-[#0F172A]">
          Veículo não encontrado
        </h1>
        <p className="mt-2 text-[#334155]">
          O veículo selecionado não está disponível para edição.
        </p>
      </section>
    )
  }

  return (
    <section className="rounded-lg bg-white p-4 shadow-sm sm:p-6 lg:p-8">
      <PageHeader
        eyebrow="Cadastro"
        title={isEditing ? 'Edição de Veículo' : 'Cadastro de Veículo'}
        description={
          isEditing
            ? 'Atualize os dados do veículo selecionado.'
            : 'Preencha os dados para incluir um veículo no EcoDrive Tracker.'
        }
        className="mb-6"
      />

      <VehicleForm veiculo={veiculo} />
    </section>
  )
}

export default Cadastro
