<script setup>
const props = defineProps({
  menus: Array,
});
</script>

<template>
  <ul class="list-disc text-sm ml-5">
    <li
      class="text-slate-600 hover:text-slate-900 cursor-pointer"
      v-for="menu in menus"
      :key="menu[0]"
    >
      <routerLink :to="{ name: menu[1] }">{{ menu[0] }}</routerLink>
    </li>
  </ul>
</template>
