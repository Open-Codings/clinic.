<script setup>
import { toRefs, onMounted } from "vue";
const props = defineProps({
  label: String,
  type: String,
  value: String,
  disabled: Boolean,
});
const emits = defineEmits(["update"]);

const { label, type, value, disabled } = toRefs(props);

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
    <input
      :type="type"
      :id="label"
      :placeholder="label"
      :disabled="disabled"
      :value="value"
      @input="input"
      :class="{ 'cursor-not-allowed input-disabled': disabled }"
      class="basis-5/6 input-control"
    />
  </div>
</template>
