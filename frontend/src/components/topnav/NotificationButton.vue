<script setup>
import { ref } from "vue";
import IconBell from "../icons/IconBell.vue";

const showNotification = ref(false)

const toggleNotification = () => {
  showNotification.value = !showNotification.value
}
</script>

<template>
  <div class="relative">
    <div
      id="notification"
      class="border border-primary-600 p-1 rounded-xl relative cursor-pointer"
      @click="toggleNotification"
    >
      <IconBell />
      <span
        class="animate-ping absolute rounded-full h-3 w-3 bg-sky-500 bottom-3/4 left-3/4"
      ></span>
      <span
        class="absolute rounded-full h-3 w-3 bg-sky-500 bottom-3/4 left-3/4"
      ></span>
    </div>
    <div
      class="absolute top-0 right-full bg-[#fff] rounded-xl p-5 mr-5 shadow-lg w-80"
      :class="{ 'hidden': !showNotification }"
    >
      <span class="text-base font-poppins font-bold">Notification</span>
      <div class="mt-2">
        <ul>
          <li>
            <a class="hover:underline cursor-pointer"
              >Lorem ipsum dolor sit amet.</a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
