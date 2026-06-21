import VehicleForm from '../src/forms/VehicleForm'

function Cadastro() {
  return (
    <section className="rounded-lg bg-white p-4 shadow-sm sm:p-6 lg:p-8">
      <p className="mb-2 text-sm font-bold uppercase text-[#22C55E]">
        Cadastro
      </p>
      <h1 className="mb-4 text-3xl font-bold text-[#0F172A]">
        Cadastro de Veículo
      </h1>
      <p className="mb-6 text-[#334155]">
        Preencha os dados para incluir um veículo no EcoDrive Tracker.
      </p>

      <VehicleForm />
    </section>
  )
}

export default Cadastro
