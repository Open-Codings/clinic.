<script setup>
import { toRefs } from "vue";

const props = defineProps({
  label: String,
  items: Array
});

const emits = defineEmits(["update"]);

const { label, items } = toRefs(props);

const selected = (event, value) => {
  emits("update", {
    [label.value.toLowerCase()]: {
      value: event ? event.target.value : value,
    },
  });
};
</script>

<template>
  <div class="flex flex-row items-center">
    <label :for="label" class="basis-1/6">{{ label }}</label>
    <select
      :id="label"
      class="basis-5/6 font-poppins rounded-md border text-gray-600 px-2 h-11 w-full bg-white"
      @change="selected"
    >
      <option v-for="item in items" :key="item" :value="item.toLowerCase()">{{ item }}</option>
    </select>
  </div>
</template>
