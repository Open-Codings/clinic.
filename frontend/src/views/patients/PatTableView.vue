<script setup>
import { ref, reactive, onMounted } from "vue";

import { useUserStore } from "@/stores/user";
import { usePatientStore } from "@/stores/patient";
import { useCheckStore } from "@/stores/check";
import { useMedAppStore } from "@/stores/med_app";

import CardMain from "@/components/cards/CardMain.vue";
import IconPencil from "@/components/icons/IconPencil.vue";
import IconTrash from "@/components/icons/IconTrash.vue";
import IconEye from "@/components/icons/IconEye.vue";
import IconAsk from "@/components/icons/IconAsk.vue";

const userRole = ref(0);
const userStore = useUserStore();

const patients = reactive([]);
const patientStore = usePatientStore();

const check = reactive({});
const checkStore = useCheckStore();

const medApp = reactive({});
const medAppStore = useMedAppStore();

onMounted(() => {
  userRole.value = userStore.getUser.role;
  patientStore.findAll();
  checkStore.findAll();
  medAppStore.findAll();
});

patientStore.$subscribe((mutation, state) => {
  patients.push(...state.patients);
});

const patDelete = (id) => {
  patientStore.delete(id);
};

const patShowCheck = (id) => {
  Object.assign(check, checkStore.getCheck(id));
  alert(`
    Patient Condition:
    Temperature: ${check.temperature}
    Weight: ${check.weight}
    Complaint: ${check.complaint}
  `);
};

const patShowMedApp = (id) => {
  Object.assign(medApp, medAppStore.getMedApp(id));
  alert(`
    Drugs:
    Name: ${medApp.medicine.name}
    Description: ${medApp.description}
  `);
};
</script>

<template>
  <CardMain v-if="userRole != 4">
    <template #card-title> List Patients </template>
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
            <th class="table-head">Preserve Date</th>
            <th class="table-head">City</th>
            <th class="table-head">Action</th>
          </tr>
        </thead>

        <tbody class="bg-white">
          <tr v-for="patient in patients" :key="patient.id">
            <td class="table-body">
              <div class="table-body-text">{{ patient.code }}</div>
            </td>
            <td class="table-body">
              <div class="table-body-text">{{ patient.name }}</div>
            </td>
            <td class="table-body">
              <div class="table-body-text">
                {{ patient.preserveDate.substring(0, 10) }}
              </div>
            </td>
            <td class="table-body">
              <div class="table-body-text">{{ patient.city }}</div>
            </td>
            <td class="table-body">
              <div class="table-body-text">
                <div class="flex flex-row space-x-2">
                  <IconEye
                    class="cursor-pointer"
                    @click="patShowMedApp(patient.id)"
                    v-if="userRole == 2"
                  />
                  <IconEye
                    class="cursor-pointer"
                    @click="patShowCheck(patient.id)"
                    v-if="userRole == 1"
                  />
                  <RouterLink
                    :to="`/medecine/ask/${patient.id}`"
                    v-if="userRole == 1"
                  >
                    <IconAsk />
                  </RouterLink>
                  <RouterLink
                    :to="`/patient/${patient.id}/precheck`"
                    v-if="userRole == 3"
                  >
                    <IconPencil color="text-yellow-400" />
                  </RouterLink>
                  <IconTrash
                    color="text-danger-700"
                    class="cursor-pointer"
                    @click="patDelete(patient.id)"
                    v-if="userRole != 4"
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
