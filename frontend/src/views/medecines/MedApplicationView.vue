<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRoute } from "vue-router";

import { useMedicineStore } from "@/stores/medicine";
import { useMedAppStore } from "@/stores/med_app";

import CardMain from "@/components/cards/CardMain.vue";
import TextAreaControl from "@/components/inputs/TextAreaControl.vue";
import InputControl from "@/components/inputs/InputControl.vue";

const route = useRoute();
const medicineStore = useMedicineStore();

const medAppStore = useMedAppStore();

const medicines = reactive([]);
const data = reactive({
  medicine: {
    value: "",
  },
  description: {
    value: "",
  },
});

onMounted(() => {
  medicineStore.findAll();
});

medicineStore.$subscribe((mutation, state) => {
  state.medicines.forEach((medicine) => {
    medicines.push({
      id: medicine.id,
      name: medicine.name,
    });
  });
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

const medAppCreate = () => {
  medAppStore.store({
    medicine: data.medicine.value,
    description: data.description.value,
    patient: route.params.id,
  });
};
</script>

<template>
  <CardMain>
    <template #card-title> Drug Application </template>
    <template #card-body>
      <form @submit.prevent="medAppCreate">
        <InputControl
          label="Name"
          type="text"
          :value="route.params.id"
          disabled="true"
          class="mt-2"
        />
        <!-- <button -->
        <!--   class="mt-2 w-full px-5 py-2 bg-success-200 rounded-md text-green-700 font-poppins" -->
        <!-- > -->
        <!--   Add Drug -->
        <!-- </button> -->
        <!-- <div class="p-2 mt-2 border border-primary-700 rounded-lg"> -->
        <div class="flex flex-row items-center mt-2">
          <label for="medicines" class="basis-1/6">Medicine</label>
          <select
            id="medicines"
            class="basis-5/6 font-poppins rounded-md border text-gray-600 px-2 h-11 w-full bg-white"
            v-model="data.medicine.value"
          >
            <option
              v-for="medicine in medicines"
              :key="medicine.id"
              :value="medicine.id"
            >
              {{ medicine.name }}
            </option>
          </select>
        </div>
        <TextAreaControl
          label="Description"
          :value="data.description.value"
          @update="update"
          class="mt-2"
        />
        <!-- </div> -->
        <div class="flex justify-end mt-5">
          <button
            class="bg-info-100 font-poppins px-4 py-2 rounded-md text-slate-800"
          >
            Save
          </button>
        </div>
      </form>
    </template>
  </CardMain>
</template>
