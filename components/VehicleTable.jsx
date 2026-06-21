import { Link } from 'react-router'

function formatCurrency(value) {
  return Number(value).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

function formatFuel(value) {
  const fuelNames = {
    gasolina: 'Gasolina',
    etanol: 'Etanol',
    diesel: 'Diesel',
    energia_eletrica: 'Energia eletrica',
  }

  return fuelNames[value] ?? value
}

function VehicleTable({ veiculos, deletingId, onDelete }) {
  return (
    <div className="w-full max-w-full overflow-x-auto rounded-md border border-[#E2E8F0]">
      <table className="min-w-[900px] w-full border-collapse text-left text-sm">
        <thead className="bg-[#F1F5F9] text-[#0F172A]">
          <tr>
            <th className="px-4 py-3 font-semibold">Veiculo</th>
            <th className="px-4 py-3 font-semibold">Placa</th>
            <th className="px-4 py-3 font-semibold">Ano</th>
            <th className="px-4 py-3 font-semibold">Combustivel</th>
            <th className="px-4 py-3 font-semibold">Consumo</th>
            <th className="px-4 py-3 font-semibold">IPVA</th>
            <th className="px-4 py-3 font-semibold">Licenciamento</th>
            <th className="px-4 py-3 text-right font-semibold">Acoes</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-[#E2E8F0] text-[#334155]">
          {veiculos.map((veiculo) => (
            <tr key={veiculo.id} className="hover:bg-[#F8FAFC]">
              <td className="px-4 py-3">
                <strong className="block text-[#0F172A]">
                  {veiculo.marca} {veiculo.modelo}
                </strong>
                <span className="text-xs capitalize">{veiculo.tipo}</span>
              </td>
              <td className="whitespace-nowrap px-4 py-3">{veiculo.placa}</td>
              <td className="whitespace-nowrap px-4 py-3">
                {veiculo.anoFabricacao}/{veiculo.anoModelo}
              </td>
              <td className="whitespace-nowrap px-4 py-3">
                {formatFuel(veiculo.combustivel)}
              </td>
              <td className="whitespace-nowrap px-4 py-3">
                {veiculo.consumoMedio} {veiculo.unidadeConsumo}
              </td>
              <td className="whitespace-nowrap px-4 py-3">
                {formatCurrency(veiculo.ipva)}
              </td>
              <td className="whitespace-nowrap px-4 py-3">
                {formatCurrency(veiculo.licenciamento)}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-right">
                <Link
                  to={`/cadastro/${veiculo.id}`}
                  className="mr-4 font-semibold text-[#1E293B] hover:underline"
                >
                  Editar
                </Link>
                <button
                  type="button"
                  disabled={deletingId === veiculo.id}
                  onClick={() => onDelete(veiculo)}
                  className="font-semibold text-[#DC2626] hover:underline disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {deletingId === veiculo.id ? 'Excluindo...' : 'Excluir'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default VehicleTable
