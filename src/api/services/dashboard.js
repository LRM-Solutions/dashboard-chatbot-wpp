export default (httpClient) => ({
  gastosPorCategoria: (chatId) => {
    return httpClient.get(`/gastos-categoria/${chatId}`);
  },
  gastosUltimosMeses: (chatId) => {
    return httpClient.get(`/gastos-mes/${chatId}`);
  },
  gastosTotalDoMes: (chatId) => {
    return httpClient.get(`/gastos-total-mes-atual/${chatId}`);
  },
  gastosDoMesLista: (chatId) => {
    return httpClient.get(`/gastos-mes-atual-lista/${chatId}`);
  },
});
