<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRoute } from "vue-router";

import { useUserStore } from "@/stores/user";
import { useMedicineStore } from "@/stores/medicine";

import CardMain from "@/components/cards/CardMain.vue";
import InputControl from "@/components/inputs/InputControl.vue";
import SelectControl from "@/components/inputs/SelectControl.vue";

const userRole = ref(0);
const userStore = useUserStore();

const route = useRoute();
const medicineStore = useMedicineStore();

const units = ref(["bottle", "tablet", "pcs"]);
const data = reactive({
  code: {
    value: "",
  },
  name: {
    value: "",
  },
  stock: {
    value: "",
  },
  price: {
    value: "",
  },
  "expire date": {
    value: "",
  },
  unit: {
    value: "",
  },
});

onMounted(() => {
  userRole.value = userStore.getUser.role;
  medicineStore.findAll();
});

medicineStore.$subscribe((mutation, state) => {
  let id = route.params.id;
  if (id) {
    let medicine = medicineStore.getMedicine(id);
    let expireDate = medicine.expireDate.substring(0, 10);
    data.code.value = medicine.code;
    data.name.value = medicine.name;
    data.stock.value = medicine.stock;
    data.price.value = medicine.price;
    data["expire date"].value = expireDate;
  }
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

const medCreate = () => {
  if (route.params.id) {
    medicineStore.update(route.params.id, {
      code: data.code.value,
      name: data.name.value,
      stock: data.stock.value,
      price: data.price.value,
      expireDate: data["expire date"].value,
      unit: data.unit.value,
    });
  } else {
    medicineStore.store({
      code: data.code.value,
      name: data.name.value,
      stock: data.stock.value,
      price: data.price.value,
      expireDate: data["expire date"].value,
      unit: data.unit.value,
    });
  }
};
</script>

<template>
  <CardMain v-if="userRole <= 2">
    <template #card-title> Add Medicine </template>
    <template #card-body>
      <form @submit.prevent="medCreate">
        <InputControl
          label="Code"
          type="text"
          :value="data.code.value"
          @update="update"
          class="mt-2"
        />
        <InputControl
          label="Name"
          type="text"
          :value="data.name.value"
          @update="update"
          class="mt-2"
        />
        <InputControl
          label="Stock"
          type="number"
          :value="data.stock.value"
          @update="update"
          class="mt-2"
        />
        <InputControl
          label="Price"
          type="number"
          :value="data.price.value"
          @update="update"
          class="mt-2"
        />
        <InputControl
          label="Expire Date"
          type="text"
          :value="data['expire date'].value"
          @update="update"
          class="mt-2"
        />
        <SelectControl
          label="Unit"
          :items="units"
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
