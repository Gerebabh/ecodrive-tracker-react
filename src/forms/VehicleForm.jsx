import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import { useVehicleContext } from '../hooks/useVehicleContext'

const inputClass =
  'mt-1 w-full rounded-md border border-[#CBD5E1] bg-white px-3 py-2 text-[#0F172A] outline-none focus:border-[#22C55E] focus:ring-2 focus:ring-[#22C55E]/20'

function FieldError({ error, id }) {
  if (!error) {
    return null
  }

  return (
    <p id={id} className="mt-1 text-sm text-[#DC2626]">
      {error.message}
    </p>
  )
}

function VehicleForm() {
  const [submitError, setSubmitError] = useState('')
  const currentYear = new Date().getFullYear()
  const navigate = useNavigate()
  const { cadastrarVeiculo } = useVehicleContext()

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
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

  async function onSubmit(dados) {
    try {
      setSubmitError('')
      await cadastrarVeiculo(dados)
      reset()
      navigate('/veiculos')
    } catch {
      setSubmitError(
        'Nao foi possivel cadastrar o veiculo. Verifique a API e tente novamente.',
      )
    }
  }

  function onInvalid() {
    setSubmitError('')
  }

  function limparFormulario() {
    reset()
    setSubmitError('')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="space-y-6">
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
            aria-invalid={!!errors.marca}
            aria-describedby={errors.marca ? 'marca-error' : undefined}
            {...register('marca', {
              required: 'A marca é obrigatória.',
              minLength: {
                value: 2,
                message: 'A marca deve possuir pelo menos 2 caracteres.',
              },
              setValueAs: (value) => value.trim(),
            })}
          />
          <FieldError error={errors.marca} id="marca-error" />
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
            aria-invalid={!!errors.modelo}
            aria-describedby={errors.modelo ? 'modelo-error' : undefined}
            {...register('modelo', {
              required: 'O modelo é obrigatório.',
              minLength: {
                value: 2,
                message: 'O modelo deve possuir pelo menos 2 caracteres.',
              },
              setValueAs: (value) => value.trim(),
            })}
          />
          <FieldError error={errors.modelo} id="modelo-error" />
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
            aria-invalid={!!errors.placa}
            aria-describedby={errors.placa ? 'placa-error' : undefined}
            {...register('placa', {
              required: 'A placa é obrigatória.',
              pattern: {
                value: /^[A-Z]{3}-?\d[A-Z0-9]\d{2}$/,
                message: 'Informe uma placa válida, como ABC-1234 ou ABC-1D23.',
              },
              setValueAs: (value) => value.trim().toUpperCase(),
            })}
          />
          <FieldError error={errors.placa} id="placa-error" />
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
              aria-invalid={!!errors.anoFabricacao}
              aria-describedby={
                errors.anoFabricacao ? 'anoFabricacao-error' : undefined
              }
              {...register('anoFabricacao', {
                required: 'O ano de fabricação é obrigatório.',
                valueAsNumber: true,
                min: {
                  value: 1886,
                  message: 'Informe um ano de fabricação válido.',
                },
                max: {
                  value: currentYear,
                  message: `O ano de fabricação não pode superar ${currentYear}.`,
                },
              })}
            />
            <FieldError
              error={errors.anoFabricacao}
              id="anoFabricacao-error"
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
              aria-invalid={!!errors.anoModelo}
              aria-describedby={errors.anoModelo ? 'anoModelo-error' : undefined}
              {...register('anoModelo', {
                required: 'O ano do modelo é obrigatório.',
                valueAsNumber: true,
                min: {
                  value: 1886,
                  message: 'Informe um ano de modelo válido.',
                },
                max: {
                  value: currentYear + 1,
                  message: `O ano do modelo não pode superar ${currentYear + 1}.`,
                },
              })}
            />
            <FieldError error={errors.anoModelo} id="anoModelo-error" />
          </div>
        </div>

        <div>
          <label htmlFor="tipo" className="font-semibold text-[#334155]">
            Tipo
          </label>
          <select
            id="tipo"
            className={inputClass}
            aria-invalid={!!errors.tipo}
            aria-describedby={errors.tipo ? 'tipo-error' : undefined}
            {...register('tipo', {
              required: 'Selecione o tipo do veículo.',
            })}
          >
            <option value="">Selecione...</option>
            <option value="combustao">Combustão</option>
            <option value="eletrico">Elétrico</option>
          </select>
          <FieldError error={errors.tipo} id="tipo-error" />
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
            aria-invalid={!!errors.combustivel}
            aria-describedby={
              errors.combustivel ? 'combustivel-error' : undefined
            }
            {...register('combustivel', {
              required: 'Selecione o combustível.',
            })}
          >
            <option value="">Selecione...</option>
            <option value="gasolina">Gasolina</option>
            <option value="etanol">Etanol</option>
            <option value="diesel">Diesel</option>
            <option value="energia_eletrica">Energia eletrica</option>
          </select>
          <FieldError error={errors.combustivel} id="combustivel-error" />
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
            aria-invalid={!!errors.consumoMedio}
            aria-describedby={
              errors.consumoMedio ? 'consumoMedio-error' : undefined
            }
            {...register('consumoMedio', {
              required: 'O consumo medio é obrigatório.',
              valueAsNumber: true,
              min: {
                value: 0.01,
                message: 'O consumo médio deve ser maior que zero.',
              },
            })}
          />
          <FieldError error={errors.consumoMedio} id="consumoMedio-error" />
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
            aria-invalid={!!errors.unidadeConsumo}
            aria-describedby={
              errors.unidadeConsumo ? 'unidadeConsumo-error' : undefined
            }
            {...register('unidadeConsumo', {
              required: 'Selecione a unidade de consumo.',
            })}
          >
            <option value="">Selecione...</option>
            <option value="km/l">km/l</option>
            <option value="kWh/100km">kWh/100km</option>
          </select>
          <FieldError
            error={errors.unidadeConsumo}
            id="unidadeConsumo-error"
          />
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
            aria-invalid={!!errors.ipva}
            aria-describedby={errors.ipva ? 'ipva-error' : undefined}
            {...register('ipva', {
              required: 'Informe o valor do IPVA, mesmo que seja zero.',
              valueAsNumber: true,
              min: {
                value: 0,
                message: 'O IPVA não pode ser negativo.',
              },
            })}
          />
          <FieldError error={errors.ipva} id="ipva-error" />
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
            aria-invalid={!!errors.licenciamento}
            aria-describedby={
              errors.licenciamento ? 'licenciamento-error' : undefined
            }
            {...register('licenciamento', {
              required: 'Informe o valor do licenciamento.',
              valueAsNumber: true,
              min: {
                value: 0,
                message: 'O licenciamento não pode ser negativo.',
              },
            })}
          />
          <FieldError
            error={errors.licenciamento}
            id="licenciamento-error"
          />
        </div>
      </div>

      {submitError && (
        <p
          role="alert"
          className="rounded-md bg-[#FEE2E2] px-4 py-3 text-sm font-medium text-[#DC2626]"
        >
          {submitError}
        </p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-[#22C55E] px-5 py-3 font-semibold text-[#0F172A] hover:bg-[#16A34A] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? 'Salvando...' : 'Salvar'}
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
