<script setup>
import { reactive } from "vue";
import { useRoute } from "vue-router";

import { useCheckStore } from "@/stores/check";

import CardMain from "@/components/cards/CardMain.vue";
import InputControl from "@/components/inputs/InputControl.vue";
import TextAreaControl from "@/components/inputs/TextAreaControl.vue";

const checkStore = useCheckStore();

const route = useRoute();
const data = reactive({
  temperature: {
    value: "",
  },
  weight: {
    value: "",
  },
  complaint: {
    value: "",
  },
});

const update = (payload) => {
  Object.keys(payload).forEach((payloadKey) => {
    Object.keys(data).forEach((dataKey) => {
      if (dataKey == payloadKey) {
        data[dataKey].value = payload[payloadKey].value;
      }
    });
  });
};

const cheCreate = () => {
  checkStore.store({
    temperature: data.temperature.value,
    weight: data.weight.value,
    complaint: data.complaint.value,
    patient: route.params.id,
  });
};
</script>

<template>
  <CardMain>
    <template #card-title> Precheck Patient </template>
    <template #card-body>
      <form @submit.prevent="cheCreate">
        <InputControl
          label="ID"
          type="text"
          :value="route.params.id"
          disabled="true"
        />
        <InputControl
          label="Temperature"
          type="text"
          :value="data.temperature.value"
          @update="update"
          class="mt-2"
        />
        <InputControl
          label="Weight"
          type="number"
          :value="data.weight.value"
          @update="update"
          class="mt-2"
        />
        <TextAreaControl
          label="Complaint"
          :value="data.complaint.value"
          @update="update"
          class="mt-2"
        />
        <div class="flex justify-end mt-5">
          <button
            type="submit"
            class="bg-info-100 font-poppins px-4 py-2 rounded-md text-slate-800"
          >
            Save
          </button>
        </div>
      </form>
    </template>
  </CardMain>
</template>
