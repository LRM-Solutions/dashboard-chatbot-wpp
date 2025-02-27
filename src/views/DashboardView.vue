<script setup>
import { useDashboardStore } from "@/stores/dashboard";
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { formatarData } from "@/utils/date";
const route = useRoute();
const dashboardStore = useDashboardStore();

const {
  gastosPorCategoria,
  gastosUltimosMeses,
  gastosTotalDoMes,
  gastosDoMesLista,
} = dashboardStore;

const gastosPorCategoriaList = ref(null);
const gastosPorMes = ref(null);
const totalGastosDoMes = ref(null);
const totalGastosDoMesLista = ref(null);

const loading = ref(false);

const initFunction = async () => {
  loading.value = true;

  gastosPorCategoriaList.value = await gastosPorCategoria(route.params.chat_id);
  gastosPorMes.value = await gastosUltimosMeses(route.params.chat_id);
  totalGastosDoMes.value = await gastosTotalDoMes(route.params.chat_id);
  totalGastosDoMesLista.value = await gastosDoMesLista(route.params.chat_id);

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
        v-if="!loading && totalGastosDoMes"
      >
        Gastos do Mês: R$
        {{ totalGastosDoMes.total.toFixed(2).replace(".", ",") }}
      </div>
    </header>

    <main class="flex flex-col w-full p-4 mt-5 mb-5 gap-10" v-if="!loading">
      <div class="flex flex-col gap-5 items-center justify-center md:flex-row">
        <div
          class="chart-container bg-white shadow-lg rounded-xl"
          v-if="gastosPorCategoriaList"
        >
          <span class="md:text-2xl text-xl font-bold">
            Total de gastos por Categoria
          </span>
          <PieChart :data="gastosPorCategoriaList" />
        </div>
        <div class="chart-container bg-white shadow-lg rounded-xl">
          <span class="md:text-2xl text-xl font-bold">
            Total de gastos por Mês
          </span>

          <BarChart :data="gastosPorMes" />
        </div>
      </div>
      <div
        v-if="totalGastosDoMesLista"
        class="bg-white p-5 w-[93%] md:w-[1020px] m-auto shadow-lg rounded-xl md:p-10 flex flex-col gap-5 mb-10"
      >
        <h1 class="ml-3 md:text-2xl text-lg font-bold">
          Tabela de Gastos do Mês atual
        </h1>
        <DataTable
          :value="totalGastosDoMesLista"
          tableStyle="min-width: 50rem; background-color: #ffffff; border-radius: 10px;"
          class="w-full"
        >
          <Column
            field="descricao"
            header="Descrição"
            style="width: 15%"
          ></Column>
          <Column
            field="categoria"
            header="Categoria"
            style="width: 15%"
          ></Column>
          <Column field="valor" header="Valor" sortable style="width: 15%">
            <template #body="slotProps">
              R$ {{ slotProps.data.valor.toFixed(2).replace(".", ",") }}
            </template>
          </Column>
          <Column field="data" header="Data" sortable style="width: 15%">
            <template #body="slotProps">
              {{ formatarData(slotProps.data.data) }}
            </template>
          </Column>
        </DataTable>
      </div>
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

  width: 500px;
  height: 500px;
  gap: 10px;

  padding: 20px;

  @media (max-width: 700px) {
    padding: 10px;

    width: 100%;
    height: auto;
  }

  @media (max-width: 400px) {
    gap: 5px;
  }
}

.row-even {
  background-color: #f9f9f9; /* Cor para linhas pares */
}

.row-odd {
  background-color: #ffffff; /* Cor para linhas ímpares */
}
</style>
