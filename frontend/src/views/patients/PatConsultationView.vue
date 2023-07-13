<script setup>
import CardMain from "@/components/cards/CardMain.vue";
import TextAreaControl from "@/components/inputs/TextAreaControl.vue";
import InputControl from "@/components/inputs/InputControl.vue";

</script>

<template>
  <CardMain>
    <template #card-title> Consultation </template>
    <template #card-body>
      <InputControl
        label="Patient"
        type="text"
        :disabled="true"
        value="Yui"
      />
      <TextAreaControl label="Consultation" class="mt-2" />
      <div class="flex justify-end mt-5">
        <button
          class="bg-info-100 font-poppins px-4 py-2 rounded-md text-slate-800"
        >
          Save
        </button>
      </div>
    </template>
  </CardMain>
</template>
