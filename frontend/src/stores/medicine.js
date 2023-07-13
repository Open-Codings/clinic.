import { defineStore } from "pinia";
import axios from "axios";

import router from "@/router";

export const useMedicineStore = defineStore({
  id: "medicine",
  state: () => ({
    medicines: [],
    medicine: {},
    total: 0,
  }),
  actions: {
    async findAll() {
      try {
        const response = await axios.get("/api/medicines");
        const data = await response.data;
        if (response.status == 200) {
          this.medicines = [...data.data];
          this.total = data.total;
        }
      } catch (err) {
        console.log("[ERROR]: " + err);
      }
    },
    async store(payload) {
      try {
        const response = await axios.post("api/medicines", payload);
        if (response.status == 200) {
          router.push("/medecine");
        }
      } catch (err) {
        console.log("[ERROR]: " + err);
      }
    },
    async update(id, payload) {
      try {
        const response = await axios.put(`api/medicines/${id}`, payload);
        if (response.status == 200) {
          router.push("/medecine");
        }
      } catch (err) {
        console.log("[ERROR]: " + err);
      }
    },
    async delete(id) {
      try {
        const response = await axios.delete(`api/medicines/${id}`);
        if (response.status == 200) {
          window.location.reload();
        }
      } catch (err) {
        console.log("[ERROR]: " + err);
      }
    },
  },
  getters: {
    getMedicines: (state) => state.medicines,
    getMedicine: (state) => {
      return (id) => state.medicines.find((medicine) => (medicine.id = id));
    },
  },
});
