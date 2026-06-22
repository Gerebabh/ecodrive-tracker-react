function calcularConsumoAnual(veiculo, quilometragemAnual) {
  const consumoMedio = Number(veiculo.consumoMedio)

  if (!Number.isFinite(consumoMedio) || consumoMedio <= 0) {
    throw new Error('O consumo médio deve ser maior que zero.')
  }

  if (veiculo.unidadeConsumo === 'kWh/100km') {
    return (quilometragemAnual * consumoMedio) / 100
  }

  return quilometragemAnual / consumoMedio
}

function calcularCustoAnual(veiculo, combustivel, quilometragemAnual) {
  const quilometragem = Number(quilometragemAnual)

  if (!Number.isFinite(quilometragem) || quilometragem <= 0) {
    throw new Error('A quilometragem anual deve ser maior que zero.')
  }

  if (!combustivel) {
    throw new Error('Preço do combustível não encontrado.')
  }

  const precoCombustivel = Number(combustivel.valor)
  const ipva = Number(veiculo.ipva)
  const licenciamento = Number(veiculo.licenciamento)

  if (!Number.isFinite(precoCombustivel) || precoCombustivel <= 0) {
    throw new Error('O preço do combustível deve ser maior que zero.')
  }

  if (!Number.isFinite(ipva) || ipva < 0) {
    throw new Error('O valor do IPVA não pode ser negativo.')
  }

  if (!Number.isFinite(licenciamento) || licenciamento < 0) {
    throw new Error('O valor do licenciamento não pode ser negativo.')
  }

  const consumoAnual = calcularConsumoAnual(veiculo, quilometragem)
  const custoCombustivel = consumoAnual * precoCombustivel
  const custos = [
    {
      id: 'combustivel',
      nome:
        veiculo.tipo === 'eletrico'
          ? 'Custo de energia'
          : 'Custo de combustível',
      valor: custoCombustivel,
    },
    {
      id: 'ipva',
      nome: 'IPVA',
      valor: ipva,
    },
    {
      id: 'licenciamento',
      nome: 'Licenciamento',
      valor: licenciamento,
    },
  ]

  return {
    consumoAnual,
    custoCombustivel,
    ipva,
    licenciamento,
    custos,
    total: custos.reduce((total, custo) => total + custo.valor, 0),
  }
}

export { calcularCustoAnual }
