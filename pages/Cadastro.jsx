import VehicleForm from '../src/forms/VehicleForm'
import { useParams } from 'react-router'
import { useVehicleContext } from '../src/hooks/useVehicleContext'

function Cadastro() {
  const { id } = useParams()
  const { veiculos, loading } = useVehicleContext()
  const veiculo = veiculos.find((item) => item.id === id)
  const isEditing = Boolean(id)

  if (isEditing && loading) {
    return (
      <p
        role="status"
        className="rounded-lg bg-white p-8 text-center text-[#334155] shadow-sm"
      >
        Carregando veiculo...
      </p>
    )
  }

  if (isEditing && !veiculo) {
    return (
      <section className="rounded-lg bg-white p-8 text-center shadow-sm">
        <h1 className="text-2xl font-bold text-[#0F172A]">
          Veiculo nao encontrado
        </h1>
        <p className="mt-2 text-[#334155]">
          O veiculo selecionado nao esta disponivel para edicao.
        </p>
      </section>
    )
  }

  return (
    <section className="rounded-lg bg-white p-4 shadow-sm sm:p-6 lg:p-8">
      <p className="mb-2 text-sm font-bold uppercase text-[#22C55E]">
        Cadastro
      </p>
      <h1 className="mb-4 text-3xl font-bold text-[#0F172A]">
        {isEditing ? 'Edicao de Veiculo' : 'Cadastro de Veiculo'}
      </h1>
      <p className="mb-6 text-[#334155]">
        {isEditing
          ? 'Atualize os dados do veiculo selecionado.'
          : 'Preencha os dados para incluir um veiculo no EcoDrive Tracker.'}
      </p>

      <VehicleForm veiculo={veiculo} />
    </section>
  )
}

export default Cadastro
