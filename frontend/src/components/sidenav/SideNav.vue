<script setup>
import { toRefs, ref, reactive } from "vue";
import { useUserStore } from "@/stores/user";

import UserButton from "./UserButton.vue";
import Menu from "./Menu.vue";

const userRole = ref("");
const user = reactive({});

const userStore = useUserStore();

const props = defineProps({
  title: String,
});
const { title } = toRefs(props);

Object.assign(user, userStore.getUser);
switch (user.role) {
  case 1:
    userRole.value = "dokter";
    break;
  case 2:
    userRole.value = "apoteker";
    break;
  case 3:
    userRole.value = "perawat";
    break;
  default:
    userRole.value = "umum";
    break;
}
</script>

<template>
  <div class="w-full h-screen bg-primary-100 rounded-xl p-5 flex flex-col">
    <routerLink class="text-3xl font-poppins font-bold" to="/">{{ title }}</routerLink>
    <div id="menu" class="flex-1">
      <Menu />
    </div>
    <UserButton :name="user.name" :role="userRole" />
  </div>
</template>
