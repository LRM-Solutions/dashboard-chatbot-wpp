function formatarData(dataISO) {
  const data = new Date(dataISO); // Converte a string ISO para um objeto Date
  const dia = String(data.getDate()).padStart(2, "0"); // Obtém o dia e adiciona um zero à esquerda, se necessário
  const mes = String(data.getMonth() + 1).padStart(2, "0"); // Obtém o mês (janeiro é 0, por isso +1) e adiciona um zero à esquerda
  const ano = data.getFullYear(); // Obtém o ano

  return `${dia}/${mes}/${ano}`; // Retorna a data no formato DD/MM/YYYY
}

export { formatarData };
