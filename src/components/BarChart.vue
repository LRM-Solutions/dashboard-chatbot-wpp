<script setup>
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { onMounted, ref } from "vue";

// Registra os componentes necessários para o gráfico de barras
Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const ctx = ref(null);

const props = defineProps({
  data: Object,
});

onMounted(() => {
  const canvas = ctx.value.getContext("2d");

  new Chart(canvas, {
    type: "bar",
    data: props.data,
    options: {
      scales: {
        y: {
          beginAtZero: true, // Começa o eixo y em zero
          max: 10, // Limita o eixo y até a nota máxima (10)
        },
      },
      plugins: {
        legend: {
          display: true, // Exibe a legenda
          position: "top", // Posição da legenda
        },
        tooltip: {
          enabled: true, // Exibe tooltips ao passar o mouse sobre as barras
          callbacks: {
            label: function (context) {
              let label = context.dataset.label || "";

              if (label) {
                label += ": ";
              }
              if (context.parsed.y !== null) {
                label += new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(context.parsed.y);
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
  height: 100%;
  width: 100%;
}
</style>
