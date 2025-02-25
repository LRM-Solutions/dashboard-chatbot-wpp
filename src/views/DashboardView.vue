<script setup>
import { useDashboardStore } from "@/stores/dashboard";
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const dashboardStore = useDashboardStore();

const { gastosPorCategoria, gastosUltimosMeses } = dashboardStore;
const gastosPorCategoriaList = ref(null);
const gastosPorMes = ref(null);

const loading = ref(false);

const initFunction = async () => {
  loading.value = true;
  gastosPorCategoriaList.value = await gastosPorCategoria(route.params.chat_id);
  gastosPorMes.value = await gastosUltimosMeses(route.params.chat_id);
  loading.value = false;
};

onMounted(async () => {
  await initFunction();
});
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Header sofisticado -->

    <header
      class="flex flex-col gap-5 p-5 items-start md:p-5 md:px-10 md:flex-row md:items-center justify-between bg-gradient-to-r from-emerald-800 to-emerald-600 text-white"
    >
      <div class="flex items-center gap-4">
        <div class="bg-white p-2 rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8 text-emerald-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div>
          <h1 class="text-2xl font-bold">Controle Financeiro</h1>
          <p class="text-emerald-100 text-sm">Relatório de Gastos</p>
        </div>
      </div>
      <div
        class="w-full md:w-[fit-content] text-sm bg-emerald-700 px-4 py-2 rounded-lg"
      >
        Gastos do Mês: R$ {{ currentMonthExpenses }}
      </div>
    </header>

    <main class="flex flex-col w-full p-4" v-if="!loading">
      <div class="flex flex-col gap-5 items-center justify-center md:flex-row">
        <div class="chart-container" v-if="gastosPorCategoriaList">
          <span> Total de gastos por Categoria </span>
          <PieChart :data="gastosPorCategoriaList" />
        </div>
        <div class="chart-container">
          <span> Total de gastos </span>

          <BarChart :data="gastosPorMes" />
        </div>
      </div>
      <div></div>
    </main>
    <div v-else class="flex items-center justify-center flex-1">
      <i
        class="pi pi-spin pi-spinner text-green-600"
        style="font-size: 3.5rem"
      ></i>
    </div>
  </div>
</template>

<style lang="scss">
.chart-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid rgba(128, 128, 128, 0.292);
  width: 500px;
  height: 500px;
  gap: 10px;
  border-radius: 20px;
  padding: 10px;

  span {
    font-size: 34px;
    font-weight: 400;
  }

  @media (max-width: 700px) {
    padding: 10px;

    width: 100%;
    height: auto;

    span {
      font-size: 30px;
    }
  }

  @media (max-width: 400px) {
    gap: 5px;
    span {
      font-size: 20px;
    }
  }
}
</style>
