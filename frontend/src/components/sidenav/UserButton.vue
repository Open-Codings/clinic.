<script setup>
import { ref, toRefs } from "vue";

import { useUserStore } from "@/stores/user";

import IconUser from "../icons/IconUser.vue";
import IconSetting from "../icons/IconSetting.vue";

const props = defineProps({
  name: String,
  role: String,
  img: String,
});

const userStore = useUserStore();
const { name, role, img } = toRefs(props);
const showSetting = ref(false);

const toggleSetting = () => {
  showSetting.value = !showSetting.value;
};

const logout = () => {
  userStore.logout();
};
</script>

<template>
  <div
    id="user"
    class="flex flex-row relative cursor-pointer"
    @click="toggleSetting"
  >
    <div id="user-icon" class="flex justify-center items-center">
      <img :src="img" :alt="name" v-if="img" />
      <IconUser v-else />
    </div>
    <div class="flex flex-row justify-between w-full items-center">
      <div id="user-content" class="flex flex-col ml-1 leading-4 font-poppins">
        <span>{{ name }}</span>
        <span class="text-sm font-normal text-gray-600">{{ role }}</span>
      </div>
      <IconSetting />
    </div>
    <div
      class="absolute left-full top-0 w-full ml-10 p-3 rounded-xl bg-primary-100 -translate-y-1/4 flex flex-col shadow-lg"
      :class="{ hidden: !showSetting }"
    >
      <button class="font-poppins text-left leading-7">Settings</button>
      <button
        @click="logout"
        class="font-poppins text-left leading-7 font-medium"
      >
        Sign out
      </button>
    </div>
  </div>
</template>
