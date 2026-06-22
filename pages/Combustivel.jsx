import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '../components/ui/Button'
import PageHeader from '../components/ui/PageHeader'
import StatusMessage from '../components/ui/StatusMessage'
import { useFuelContext } from '../src/hooks/useFuelContext'

function Combustivel() {
  const [submitError, setSubmitError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const {
    combustiveis,
    editarCombustiveis,
    error: loadError,
    loading,
  } = useFuelContext()

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    reset,
  } = useForm()

  useEffect(() => {
    if (combustiveis.length > 0) {
      reset(
        combustiveis.reduce(
          (valores, combustivel) => ({
            ...valores,
            [combustivel.id]: combustivel.valor,
          }),
          {},
        ),
      )
    }
  }, [combustiveis, reset])

  async function onSubmit(valores) {
    try {
      setSubmitError('')
      setSuccessMessage('')

      const dadosAtualizados = combustiveis.map((combustivel) => ({
        ...combustivel,
        valor: Number(valores[combustivel.id]),
      }))

      await editarCombustiveis(dadosAtualizados)
      setSuccessMessage('Valores atualizados com sucesso.')
    } catch {
      setSubmitError(
        'Não foi possível atualizar os valores. Verifique a API e tente novamente.',
      )
    }
  }

  return (
    <section className="rounded-lg bg-white p-4 shadow-sm sm:p-6 lg:p-8">
      <PageHeader
        eyebrow="Combustível"
        title="Configuração de Combustíveis"
        description="Defina os valores utilizados nos cálculos de consumo."
        className="mb-6"
      />

      {loading && (
        <StatusMessage>
          Carregando combustíveis...
        </StatusMessage>
      )}

      {loadError && (
        <StatusMessage type="error">{loadError}</StatusMessage>
      )}

      {!loading && !loadError && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-xl space-y-5"
        >
          {combustiveis.map((combustivel) => (
            <div key={combustivel.id}>
              <label
                htmlFor={`combustivel-${combustivel.id}`}
                className="mb-1 block font-semibold text-[#0F172A]"
              >
                {combustivel.nome}
              </label>
              <div className="flex max-w-xs items-center overflow-hidden rounded-md border border-slate-300 bg-white focus-within:border-[#22C55E] focus-within:ring-2 focus-within:ring-green-100">
                <span className="border-r border-slate-300 bg-slate-50 px-3 py-3 text-sm text-[#334155]">
                  R$
                </span>
                <input
                  id={`combustivel-${combustivel.id}`}
                  type="number"
                  step="0.01"
                  min="0.01"
                  inputMode="decimal"
                  aria-describedby={
                    errors[combustivel.id]
                      ? `erro-combustivel-${combustivel.id}`
                      : undefined
                  }
                  className="min-w-0 flex-1 px-3 py-3 text-[#334155] outline-none"
                  {...register(combustivel.id, {
                    required: 'Informe o valor.',
                    min: {
                      value: 0.01,
                      message: 'O valor deve ser maior que zero.',
                    },
                    valueAsNumber: true,
                  })}
                />
                <span className="border-l border-slate-300 bg-slate-50 px-3 py-3 text-sm text-[#334155]">
                  {combustivel.unidade.replace('R$/', '/')}
                </span>
              </div>
              {errors[combustivel.id] && (
                <p
                  id={`erro-combustivel-${combustivel.id}`}
                  role="alert"
                  className="mt-1 text-sm font-semibold text-[#DC2626]"
                >
                  {errors[combustivel.id].message}
                </p>
              )}
            </div>
          ))}

          {submitError && (
            <StatusMessage type="error">{submitError}</StatusMessage>
          )}

          {successMessage && (
            <StatusMessage type="success">{successMessage}</StatusMessage>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Salvando...' : 'Salvar alterações'}
          </Button>
        </form>
      )}
    </section>
  )
}

export default Combustivel
