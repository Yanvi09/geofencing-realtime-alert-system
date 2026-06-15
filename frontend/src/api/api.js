import axios from "axios";

const api = axios.create({
  baseURL: "https://geofencing-realtime-alert-system.onrender.com",
});

export default api;