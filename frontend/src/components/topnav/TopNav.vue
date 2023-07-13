<script setup>
import { toRefs } from "vue";
import NotificationButton from "./NotificationButton.vue";

const props = defineProps({
  title: String,
});

const { title } = toRefs(props);
</script>

<template>
  <div id="navbar" class="flex justify-between">
    <span class="text-3xl font-poppins font-bold">{{ title }}</span>
    <div id="navbar-icons">
      <NotificationButton />
    </div>
  </div>
</template>
