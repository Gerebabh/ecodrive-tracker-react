function formatCurrency(value) {
  return Number(value).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

function VehicleCostCard({ veiculo, resultado, isWinner }) {
  return (
    <article
      className={`border p-5 ${
        isWinner
          ? 'border-[#22C55E] bg-green-50'
          : 'border-slate-200 bg-white'
      }`}
    >
      <div className="mb-5 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase text-[#334155]">
            {veiculo.tipo === 'eletrico' ? 'Elétrico' : 'Combustão'}
          </p>
          <h3 className="mt-1 text-xl font-bold text-[#0F172A]">
            {veiculo.marca} {veiculo.modelo}
          </h3>
        </div>
        {isWinner && (
          <span className="rounded bg-[#22C55E] px-2 py-1 text-xs font-bold text-[#0F172A]">
            Mais econômico
          </span>
        )}
      </div>

      <dl className="divide-y divide-slate-200">
        {resultado.custos.map((custo) => (
          <div
            key={custo.id}
            className="flex items-center justify-between gap-4 py-3"
          >
            <dt className="text-[#334155]">{custo.nome}</dt>
            <dd className="font-semibold text-[#0F172A]">
              {formatCurrency(custo.valor)}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-3 flex items-end justify-between gap-4 border-t-2 border-[#0F172A] pt-4">
        <span className="font-bold uppercase text-[#334155]">Total anual</span>
        <strong className="text-2xl text-[#0F172A]">
          {formatCurrency(resultado.total)}
        </strong>
      </div>
    </article>
  )
}

function ComparisonResult({
  veiculoA,
  veiculoB,
  resultadoA,
  resultadoB,
  quilometragemAnual,
}) {
  const isTie = resultadoA.total === resultadoB.total
  const winner =
    resultadoA.total < resultadoB.total ? veiculoA : veiculoB
  const savings = Math.abs(resultadoA.total - resultadoB.total)

  return (
    <div role="status">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm text-[#334155]">
          Estimativa para{' '}
          <strong>
            {Number(quilometragemAnual).toLocaleString('pt-BR')} km/ano
          </strong>
        </p>
        <p className="text-sm text-[#334155]">
          Valores anuais estimados
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <VehicleCostCard
          veiculo={veiculoA}
          resultado={resultadoA}
          isWinner={!isTie && winner.id === veiculoA.id}
        />
        <VehicleCostCard
          veiculo={veiculoB}
          resultado={resultadoB}
          isWinner={!isTie && winner.id === veiculoB.id}
        />
      </div>

      <div className="mt-5 border-l-4 border-[#22C55E] bg-green-50 px-4 py-3 text-[#0F172A]">
        {isTie ? (
          <p className="font-semibold">
            Os dois veículos possuem o mesmo custo anual estimado.
          </p>
        ) : (
          <p>
            <strong>
              {winner.marca} {winner.modelo}
            </strong>{' '}
            é o veículo mais econômico, com uma economia anual estimada de{' '}
            <strong>{formatCurrency(savings)}</strong>.
          </p>
        )}
      </div>
    </div>
  )
}

export default ComparisonResult
