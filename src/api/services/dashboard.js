export default (httpClient) => ({
  gastosPorCategoria: (chatId) => {
    return httpClient.get(`/gastos-categoria/${chatId}`);
  },
  gastosUltimosMeses: (chatId) => {
    return httpClient.get(`/gastos-mes/${chatId}`);
  },
});
