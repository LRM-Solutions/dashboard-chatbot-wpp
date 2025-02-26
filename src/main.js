import "./assets/main.css";
import "primeicons/primeicons.css";

import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import ToastService from "primevue/toastservice";
// components
const app = createApp(App);

import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Toast from "primevue/toast";
import BarChart from "./components/BarChart.vue";
import PieChart from "./components/PieChart.vue";
import { DataTable } from "primevue";
import { Column } from "primevue";
import ProgressSpinner from "primevue/progressspinner";

// import components
app.component("DataTable", DataTable);
app.component("Column", Column);
app.component("ProgressSpinner", ProgressSpinner);
app.component("BarChart", BarChart);
app.component("PieChart", PieChart);
app.component("Button", Button);
app.component("InputText", InputText);
app.component("Toast", Toast);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: "none",
      cssLayer: {
        name: "primevue",
        order: "tailwind-base, primevue, tailwind-utilities",
      },
    },
  },
});
app.use(createPinia());
app.use(router);
app.use(ToastService);
app.mount("#app");
