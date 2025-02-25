import axios from "axios";

import dashboardService from "./services/dashboard";
const baseURL = import.meta.env.VITE_URL_API;

const httpClient = axios.create({ baseURL });

export default {
  dashboard: dashboardService(httpClient),
};
