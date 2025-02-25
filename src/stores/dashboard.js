import { defineStore } from "pinia";
import api from "@/api";

export const useDashboardStore = defineStore("dashboard", () => {
  async function gastosPorCategoria(chat_id) {
    try {
      const response = await api.dashboard.gastosPorCategoria(chat_id);
      localStorage.setItem("token-auth", response.data.token);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
  async function gastosUltimosMeses(chat_id) {
    try {
      const response = await api.dashboard.gastosUltimosMeses(chat_id);
      localStorage.setItem("token-auth", response.data.token);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  return {
    gastosPorCategoria,
    gastosUltimosMeses,
  };
});
