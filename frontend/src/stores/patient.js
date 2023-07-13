import { defineStore } from "pinia";
import axios from "axios";

import router from "@/router";

export const usePatientStore = defineStore({
  id: "patient",
  state: () => ({
    patients: [],
    total: 0,
  }),
  actions: {
    async findAll() {
      try {
        const response = await axios.get("/api/patients");
        const data = await response.data;
        if (response.status == 200) {
          this.patients = [...data.data];
          this.total = data.total;
        }
      } catch (err) {
        console.log("[ERROR]: " + err);
      }
    },
    async store(payload) {
      try {
        const response = await axios.post("api/patients", payload);
        const data = await response.data;
        if (response.status == 200) {
          alert(`
            Patient's Credentials:\n
            email: ${data.data[1].email}
            password: ${data.data[1].password}
          `);
          router.push("/patient");
        }
      } catch (err) {
        console.log("[ERROR]: " + err);
      }
    },
    async delete(id) {
      try {
        const response = await axios.delete(`api/patients/${id}`);
        if (response.status == 200) {
          window.location.reload();
        }
      } catch (err) {
        console.log("[ERROR]: " + err);
      }
    },
  },
  getters: {
    getPatients: (state) => state.patients,
  },
});
