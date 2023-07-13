import { defineStore } from "pinia";
import axios from "axios";

import router from "@/router";

export const useCheckStore = defineStore({
  id: "check",
  state: () => ({
    checks: [],
    total: 0,
  }),
  actions: {
    async findAll() {
      try {
        const response = await axios.get("/api/checks");
        const data = await response.data;
        if (response.status == 200) {
          this.checks = [...data.data ];
        }
      } catch (err) {
        console.log("[ERROR]: " + err);
      }
    },
    async store(payload) {
      try {
        const response = await axios.post("api/checks", payload);
        if (response.status == 200) {
          router.push("/patient");
        }
      } catch (err) {
        console.log("[ERROR]: " + err);
      }
    },
    async update(id, payload) {
      try {
        const response = await axios.put(`api/checks/${id}`, payload);
        if (response.status == 200) {
          router.push("/patient");
        }
      } catch (err) {
        console.log("[ERROR]: " + err);
      }
    },
  },
  getters: {
    getChecks: (state) => state.checks,
    getCheck: (state) => {
      return (id) => state.checks.find((check) => (check.patient = id));
    },
  },
});
