import { ButtonLink } from '../components/ui/Button'

function Erro404() {
  return (
    <section className="flex min-h-[55vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl text-center">
        <h1 className="mb-2 text-7xl font-extrabold text-[#0F172A] sm:text-8xl">
          404
        </h1>
        <h2 className="mb-3 text-2xl font-semibold text-[#1E293B]">
          Página não encontrada
        </h2>
        <p className="mb-8 text-[#334155]">
          A página que você tentou acessar não existe.
        </p>
        <ButtonLink to="/">
          Voltar para Home
        </ButtonLink>
      </div>
    </section>
  )
}

export default Erro404
