import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router'

const inputClass =
  'mt-1 w-full rounded-md border border-[#CBD5E1] bg-white px-3 py-2 text-[#0F172A] outline-none focus:border-[#22C55E] focus:ring-2 focus:ring-[#22C55E]/20'

function VehicleForm() {
  const [feedback, setFeedback] = useState('')

  const { handleSubmit, register, reset } = useForm({
    defaultValues: {
      marca: '',
      modelo: '',
      placa: '',
      anoFabricacao: '',
      anoModelo: '',
      tipo: '',
      combustivel: '',
      consumoMedio: '',
      unidadeConsumo: '',
      ipva: '',
      licenciamento: '',
    },
  })

  function onSubmit(dados) {
    console.log('Dados do veiculo:', dados)
    setFeedback('Formulario preenchido. Os dados estao prontos para o cadastro.')
  }

  function limparFormulario() {
    reset()
    setFeedback('')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="marca" className="font-semibold text-[#334155]">
            Marca
          </label>
          <input
            id="marca"
            type="text"
            placeholder="Ex: Hyundai"
            className={inputClass}
            {...register('marca')}
          />
        </div>

        <div>
          <label htmlFor="modelo" className="font-semibold text-[#334155]">
            Modelo
          </label>
          <input
            id="modelo"
            type="text"
            placeholder="Ex: i30"
            className={inputClass}
            {...register('modelo')}
          />
        </div>

        <div>
          <label htmlFor="placa" className="font-semibold text-[#334155]">
            Placa
          </label>
          <input
            id="placa"
            type="text"
            placeholder="ABC-1D23"
            className={inputClass}
            {...register('placa')}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label
              htmlFor="anoFabricacao"
              className="font-semibold text-[#334155]"
            >
              Ano fabricação
            </label>
            <input
              id="anoFabricacao"
              type="number"
              placeholder="2025"
              className={inputClass}
              {...register('anoFabricacao', { valueAsNumber: true })}
            />
          </div>

          <div>
            <label
              htmlFor="anoModelo"
              className="font-semibold text-[#334155]"
            >
              Ano modelo
            </label>
            <input
              id="anoModelo"
              type="number"
              placeholder="2025"
              className={inputClass}
              {...register('anoModelo', { valueAsNumber: true })}
            />
          </div>
        </div>

        <div>
          <label htmlFor="tipo" className="font-semibold text-[#334155]">
            Tipo
          </label>
          <select id="tipo" className={inputClass} {...register('tipo')}>
            <option value="">Selecione...</option>
            <option value="combustao">Combustao</option>
            <option value="eletrico">Eletrico</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="combustivel"
            className="font-semibold text-[#334155]"
          >
            Combustível
          </label>
          <select
            id="combustivel"
            className={inputClass}
            {...register('combustivel')}
          >
            <option value="">Selecione...</option>
            <option value="gasolina">Gasolina</option>
            <option value="etanol">Etanol</option>
            <option value="diesel">Diesel</option>
            <option value="energia_eletrica">Energia eletrica</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="consumoMedio"
            className="font-semibold text-[#334155]"
          >
            Consumo médio
          </label>
          <input
            id="consumoMedio"
            type="number"
            step="0.01"
            placeholder="Ex: 9"
            className={inputClass}
            {...register('consumoMedio', { valueAsNumber: true })}
          />
        </div>

        <div>
          <label
            htmlFor="unidadeConsumo"
            className="font-semibold text-[#334155]"
          >
            Unidade de consumo
          </label>
          <select
            id="unidadeConsumo"
            className={inputClass}
            {...register('unidadeConsumo')}
          >
            <option value="">Selecione...</option>
            <option value="km/l">km/l</option>
            <option value="kWh/100km">kWh/100km</option>
          </select>
        </div>

        <div>
          <label htmlFor="ipva" className="font-semibold text-[#334155]">
            IPVA anual (R$)
          </label>
          <input
            id="ipva"
            type="number"
            step="0.01"
            placeholder="0,00"
            className={inputClass}
            {...register('ipva', { valueAsNumber: true })}
          />
        </div>

        <div>
          <label
            htmlFor="licenciamento"
            className="font-semibold text-[#334155]"
          >
            Licenciamento anual (R$)
          </label>
          <input
            id="licenciamento"
            type="number"
            step="0.01"
            placeholder="0,00"
            className={inputClass}
            {...register('licenciamento', { valueAsNumber: true })}
          />
        </div>
      </div>

      {feedback && (
        <p className="rounded-md bg-[#DCFCE7] px-4 py-3 text-sm font-medium text-[#166534]">
          {feedback}
        </p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          className="rounded-md bg-[#22C55E] px-5 py-3 font-semibold text-[#0F172A] hover:bg-[#16A34A]"
        >
          Salvar
        </button>
        <button
          type="button"
          onClick={limparFormulario}
          className="rounded-md border border-[#CBD5E1] px-5 py-3 font-semibold text-[#334155] hover:bg-[#F1F5F9]"
        >
          Limpar
        </button>
        <Link
          to="/veiculos"
          className="rounded-md border border-[#CBD5E1] px-5 py-3 text-center font-semibold text-[#334155] hover:bg-[#F1F5F9]"
        >
          Cancelar
        </Link>
      </div>
    </form>
  )
}

export default VehicleForm
