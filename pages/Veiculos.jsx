import { useState } from 'react'
import VehicleTable from '../components/VehicleTable'
import { ButtonLink } from '../components/ui/Button'
import PageHeader from '../components/ui/PageHeader'
import StatusMessage from '../components/ui/StatusMessage'
import { useVehicleContext } from '../src/hooks/useVehicleContext'

function Veiculos() {
  const [deletingId, setDeletingId] = useState('')
  const [deleteError, setDeleteError] = useState('')
  const { veiculos, loading, error, excluirVeiculo } = useVehicleContext()

  async function handleDelete(veiculo) {
    const confirmed = window.confirm(
      `Deseja realmente excluir ${veiculo.marca} ${veiculo.modelo}?`,
    )

    if (!confirmed) {
      return
    }

    try {
      setDeleteError('')
      setDeletingId(veiculo.id)
      await excluirVeiculo(veiculo.id)
    } catch {
      setDeleteError(
        'Não foi possível excluir o veículo. Verifique a API e tente novamente.',
      )
    } finally {
      setDeletingId('')
    }
  }

  return (
    <section className="min-w-0 rounded-lg bg-white p-4 shadow-sm sm:p-6 lg:p-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <PageHeader eyebrow="Veículos" title="Veículos cadastrados" />
        </div>

        <ButtonLink to="/cadastro">
          Novo veículo
        </ButtonLink>
      </div>

      {loading && (
        <StatusMessage className="py-6 text-center">
          Carregando veículos...
        </StatusMessage>
      )}

      {!loading && error && (
        <StatusMessage type="error" className="py-6 text-center">
          {error}
        </StatusMessage>
      )}

      {deleteError && (
        <StatusMessage type="error" className="mb-4">
          {deleteError}
        </StatusMessage>
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
        <VehicleTable
          veiculos={veiculos}
          deletingId={deletingId}
          onDelete={handleDelete}
        />
      )}
    </section>
  )
}

export default Veiculos
