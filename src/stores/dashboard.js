import { defineStore } from "pinia";
import api from "@/api";

export const useDashboardStore = defineStore("dashboard", () => {
  async function gastosPorCategoria(chat_id) {
    try {
      const response = await api.dashboard.gastosPorCategoria(chat_id);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
  async function gastosUltimosMeses(chat_id) {
    try {
      const response = await api.dashboard.gastosUltimosMeses(chat_id);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
  async function gastosTotalDoMes(chat_id) {
    try {
      const response = await api.dashboard.gastosTotalDoMes(chat_id);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
  async function gastosDoMesLista(chat_id) {
    try {
      const response = await api.dashboard.gastosDoMesLista(chat_id);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  return {
    gastosPorCategoria,
    gastosUltimosMeses,
    gastosTotalDoMes,
    gastosDoMesLista,
  };
});
