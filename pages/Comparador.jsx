import { useFuelContext } from '../src/hooks/useFuelContext'

function Comparador() {
  const { combustiveis, error, loading } = useFuelContext()

  return (
    <section className="rounded-lg bg-white p-8 shadow-sm">
      <p className="mb-2 text-sm font-bold uppercase text-[#22C55E]">
        Comparador
      </p>
      <h1 className="mb-4 text-3xl font-bold text-[#0F172A]">
        Comparador de custos
      </h1>
      {loading && (
        <p role="status" className="text-[#334155]">
          Carregando valores dos combustíveis...
        </p>
      )}

      {error && (
        <p role="alert" className="font-semibold text-[#DC2626]">
          {error}
        </p>
      )}

      {!loading && !error && (
        <>
          <p className="text-[#334155]">
            Esta página apresentará a comparação entre veículos elétricos e a
            combustão utilizando os valores atuais dos combustíveis.
          </p>
          <p className="mt-4 text-sm font-semibold text-[#16A34A]">
            {combustiveis.length} valores de combustível carregados.
          </p>
        </>
      )}
    </section>
  )
}

export default Comparador
