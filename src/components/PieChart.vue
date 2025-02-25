<script setup>
import { Chart, PieController, ArcElement, Tooltip, Legend } from "chart.js";
import { onMounted, ref } from "vue";

// Registra os componentes necessários para o gráfico de pizza
Chart.register(PieController, ArcElement, Tooltip, Legend);

const props = defineProps({
  data: Object,
});

const ctx = ref(null);

onMounted(() => {
  const canvas = ctx.value.getContext("2d");

  new Chart(canvas, {
    type: "pie",
    data: props.data,
    options: {
      plugins: {
        legend: {
          display: true, // Exibe a legenda
          position: "top", // Define a posição da legenda
        },
        tooltip: {
          enabled: true, // Exibe tooltips para cada segmento
          callbacks: {
            label: function (context) {
              let label = context.label || "";

              if (label) {
                label += ": ";
              }
              if (context.raw !== null) {
                label += new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(context.raw);
              }
              return label;
            },
          },
        },
      },
    },
  });
});
</script>

<template>
  <div class="chart">
    <canvas ref="ctx" id="myChart"></canvas>
  </div>
</template>

<style scoped>
.chart {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80%;
  width: 100%;
}
</style>
