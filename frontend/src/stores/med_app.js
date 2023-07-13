import { defineStore } from "pinia";
import axios from "axios";

import router from "@/router";

export const useMedAppStore = defineStore({
  id: "medApp",
  state: () => ({
    medApps: [],
    total: 0,
  }),
  actions: {
    async findAll() {
      try {
        const response = await axios.get("/api/medApps");
        const data = await response.data;
        if (response.status == 200) {
          this.medApps = [...data.data];
          this.total = data.total;
        }
      } catch (err) {
        console.log("[ERROR]: " + err);
      }
    },
    async store(payload) {
      try {
        const response = await axios.post("api/medApps", payload);
        if (response.status == 200) {
          router.push("/patient");
        }
      } catch (err) {
        console.log("[ERROR]: " + err);
      }
    },
  },
  getters: {
    getMedApps: (state) => state.medicines,
    getMedApp: (state) => {
      return (id) => state.medApps.find((medApp) => (medApp.id = id));
    },
  },
});
