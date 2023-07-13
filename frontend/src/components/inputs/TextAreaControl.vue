<script setup>
import { toRefs, onMounted } from "vue";
const props = defineProps({
  label: String,
  value: String,
});
const emits = defineEmits(["update"]);

const { label, value } = toRefs(props);

onMounted(() => {
  if (value.value) {
    input(undefined, value.value);
  }
});

const input = (event, value) => {
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
    <textarea
      :id="label"
      :value="value"
      @input="input"
      rows="2"
      class="basis-5/6 textarea-control"
    ></textarea>
  </div>
</template>
