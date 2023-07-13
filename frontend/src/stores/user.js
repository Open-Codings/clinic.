import axios from "axios";

import { defineStore } from "pinia";
import router from "@/router";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    user: {},
  }),
  actions: {
    async login(payload) {
      try {
        const response = await axios.post("/api/users/login", payload);
        const data = await response.data;
        if (response.status == 200) {
          let userInfo = {
            id: data.user.id,
            name: data.user.name,
            username: data.user.username,
            role: data.user.role,
          };

          localStorage.setItem("token", data.user.token);
          localStorage.setItem("user", JSON.stringify(userInfo));

          this.user = userInfo;

          router.push("/");
        }
      } catch (err) {
        console.log("[ERROR]: " + err);
      }
    },
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      window.location.reload();
    },
  },
  getters: {
    getUser: () => {
      let userInfo = JSON.parse(localStorage.getItem("user"));
      return userInfo;
    },
  },
});
