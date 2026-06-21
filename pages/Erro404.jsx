import { Link } from 'react-router'

function Erro404() {
  return (
    <section className="flex min-h-[55vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl text-center">
        <h1 className="mb-2 text-7xl font-extrabold text-[#0F172A] sm:text-8xl">
          404
        </h1>
        <h2 className="mb-3 text-2xl font-semibold text-[#1E293B]">
          Pagina nao encontrada
        </h2>
        <p className="mb-8 text-[#334155]">
          A pagina que voce tentou acessar nao existe.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-md bg-[#22C55E] px-6 py-3 font-semibold text-[#0F172A] transition-colors hover:bg-[#16A34A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F172A]"
        >
          Voltar para Home
        </Link>
      </div>
    </section>
  )
}

export default Erro404
