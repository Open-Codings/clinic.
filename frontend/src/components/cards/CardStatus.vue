<script setup>
import { toRefs } from "vue";
import IconPlus from "../icons/IconPlus.vue";

const props = defineProps({
  title: String,
  status: String,
});

const { title, status } = toRefs(props);
</script>

<template>
  <div id="card" class="w-full h-32 p-5 bg-slate-50 rounded-xl shadow-sm">
    <div class="flex flex-col h-full">
      <span>{{ title }}</span>
      <div class="flex-1"></div>
      <div class="flex flex-row justify-between">
        <span class="text-xl font-semibold">{{ status }}</span>
        <div class="border border-primary-600 p-1 rounded-xl">
          <IconPlus />
        </div>
      </div>
    </div>
  </div>
</template>
