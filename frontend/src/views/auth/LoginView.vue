<script setup>
import { ref } from "vue";

import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

const email = ref("");
const password = ref("");

const login = () => {
  userStore.login({ email: email.value, password: password.value });
};
</script>

<template>
  <div class="flex flex-row space-x-10 p-10 h-full">
    <div class="basis-2/4"></div>
    <div class="basis-2/4">
      <form @submit.prevent="login">
        <div
          class="w-full h-full bg-white rounded-xl shadow-xl p-20 font-poppins text-gray-800 antialiased flex flex-col text-center"
        >
          <span class="text-2xl font-bold">Sign In</span>
          <span class="text-gray-600">Clinic Information System</span>
          <div class="flex flex-col space-y-3 my-10">
            <div>
              <label for="email" class="block font-semibold text-left"
                >Email</label
              >
              <input
                type="email"
                id="email"
                placeholder="Email"
                class="form-input"
                v-model.trim="email"
              />
            </div>
            <div>
              <label for="password" class="block font-semibold text-left"
                >Password</label
              >
              <input
                type="password"
                id="password"
                placeholder="Password"
                class="form-input"
                v-model.trim="password"
              />
            </div>
          </div>
          <div class="mb-10">
            <button
              type="submit"
              class="bg-blue-500 w-full py-2 rounded-md text-blue-100"
            >
              Sign In
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
