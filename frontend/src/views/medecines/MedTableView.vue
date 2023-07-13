<script setup>
import { ref, reactive, onMounted } from "vue";

import { useUserStore } from "@/stores/user";
import { useMedicineStore } from "@/stores/medicine";

import CardMain from "@/components/cards/CardMain.vue";
import IconPencil from "@/components/icons/IconPencil.vue";
import IconTrash from "@/components/icons/IconTrash.vue";

const userRole = ref(0);
const userStore = useUserStore();

const medicines = reactive([]);
const medicineStore = useMedicineStore();

onMounted(() => {
  userRole.value = userStore.getUser.role;
  medicineStore.findAll();
});

medicineStore.$subscribe((mutation, state) => {
  medicines.push(...state.medicines);
});

const medDelete = (id) => {
  medicineStore.delete(id);
};
</script>

<template>
  <CardMain v-if="userRole <= 2">
    <template #card-title> List Medicines </template>
    <template #card-tool>
      <input
        type="text"
        placeholder="Search..."
        class="border w-40 h-5 px-3 py-5 font-normal hover:outline-none focus:outline-none focus:ring-1 focus:ring-primary-300 rounded-lg"
      />
    </template>
    <template #card-body>
      <table class="min-w-full">
        <thead>
          <tr>
            <th class="table-head">Code</th>
            <th class="table-head">Name</th>
            <th class="table-head">Stock</th>
            <th class="table-head">Price</th>
            <th class="table-head">Action</th>
          </tr>
        </thead>

        <tbody class="bg-white">
          <tr v-for="medicine in medicines" :key="medicine.id">
            <td class="table-body">
              <div class="table-body-text">{{ medicine.code }}</div>
            </td>
            <td class="table-body">
              <div class="table-body-text">{{ medicine.name }}</div>
            </td>
            <td class="table-body">
              <div class="table-body-text">
                {{ medicine.stock }} {{ medicine.unit }}
              </div>
            </td>
            <td class="table-body">
              <div class="table-body-text">Rp. {{ medicine.price }}</div>
            </td>
            <td class="table-body">
              <div class="table-body-text">
                <div class="flex flex-row space-x-2">
                  <routerLink
                    :to="{ name: 'medecine-edit', params: { id: medicine.id } }"
                  >
                    <IconPencil color="text-yellow-400" />
                  </routerLink>
                  <IconTrash
                    color="text-danger-700"
                    class="cursor-pointer"
                    @click="medDelete(medicine.id)"
                  />
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </template>
  </CardMain>
</template>
