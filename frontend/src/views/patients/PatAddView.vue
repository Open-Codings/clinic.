<script setup>
import { ref, reactive, onMounted } from "vue";

import { useUserStore } from "@/stores/user";
import { usePatientStore } from "@/stores/patient";

import IconSearch from "@/components/icons/IconSearch.vue";
import CardMain from "@/components/cards/CardMain.vue";
import InputControl from "@/components/inputs/InputControl.vue";
import TextAreaControl from "@/components/inputs/TextAreaControl.vue";
import SelectControl from "@/components/inputs/SelectControl.vue";

const userRole = ref(0);
const userStore = useUserStore();

const patientStore = usePatientStore();

const genders = ref(["Male", "Female", "Other"]);
const data = reactive({
  code: {
    value: "",
  },
  "preserve date": {
    value: "",
  },
  name: {
    value: "",
  },
  gender: {
    value: "",
  },
  place: {
    value: "",
  },
  "birth date": {
    value: "",
  },
  phone: {
    value: "",
  },
  address: {
    value: "",
  },
  city: {
    value: "",
  },
});

onMounted(() => {
  userRole.value = userStore.getUser.role;
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

const patCreate = () => {
  patientStore.store({
    code: data.code.value,
    preserveDate: data["preserve date"].value,
    name: data.name.value,
    gender: data.gender.value,
    place: data.place.value,
    birthDate: data["birth date"].value,
    phone: data.phone.value,
    address: data.address.value,
    city: data.city.value,
  });
};
</script>

<template>
  <CardMain v-if="userRole == 3">
    <template #card-title> Preserve Patient </template>
    <template #card-body>
      <form @submit.prevent="patCreate">
        <InputControl
          label="Code"
          type="text"
          :value="data.code.value"
          @update="update"
          class="mt-2"
        />
        <InputControl
          label="Preserve Date"
          type="text"
          :value="data['preserve date'].value"
          @update="update"
          class="mt-2"
        />
        <div class="flex flex-row mt-2 items-center">
          <label class="basis-1/6">Name</label>
          <div class="flex basis-5/6 flex-row space-x-4 items-center">
            <input
              type="text"
              placeholder="Name"
              v-model="data.name.value"
              class="basis-11/12 border w-full h-5 px-3 py-5 font-normal hover:outline-none focus:outline-none focus:ring-1 focus:ring-primary-300 rounded-md"
            />
            <button
              class="flex justify-center items-center w-full basis-1/12 bg-info-100 border rounded-md py-2 px-2"
            >
              <IconSearch color="text-slate-900" />
            </button>
          </div>
        </div>
        <SelectControl
          label="Gender"
          :items="genders"
          @update="update"
          class="mt-2"
        />
        <div class="flex flex-row items-center mt-2">
          <label class="basis-1/6">Place, Date of Birth</label>
          <div class="flex basis-5/6 flex-row space-x-4 items-center">
            <input
              type="text"
              placeholder="Place of Birth"
              v-model="data.place.value"
              class="basis-2/6 border w-full h-5 px-3 py-5 font-normal hover:outline-none focus:outline-none focus:ring-1 focus:ring-primary-300 rounded-md"
            />
            <input
              type="text"
              placeholder="Date of Birth"
              v-model="data['birth date'].value"
              class="basis-4/6 border w-full h-5 px-3 py-5 font-normal hover:outline-none focus:outline-none focus:ring-1 focus:ring-primary-300 rounded-md"
            />
          </div>
        </div>
        <InputControl
          label="Phone"
          type="text"
          :value="data.phone.value"
          @update="update"
          class="mt-2"
        />
        <TextAreaControl
          label="Address"
          :value="data.address.value"
          @update="update"
          class="mt-2"
        />
        <InputControl
          label="City"
          type="text"
          :value="data.city.value"
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
