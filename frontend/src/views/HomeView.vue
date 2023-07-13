<script setup>
import { ref, onMounted, computed } from "vue";

import CardStatus from "../components/cards/CardStatus.vue";

import { useMedicineStore } from "@/stores/medicine";
import { usePatientStore } from "@/stores/patient";

const medicineTotal = ref(0);
const patientTotal = ref(0);
const medicineStore = useMedicineStore();
const patientStore = usePatientStore();

onMounted(() => {
  medicineStore.findAll();
  patientStore.findAll();
});

medicineTotal.value = computed(() => medicineStore.total);
patientTotal.value = computed(() => patientStore.total);
</script>

<template>
  <div id="stat" class="flex flex-row space-x-10">
    <div class="basis-1/3">
      <CardStatus title="Jumlah Obat" :status="medicineTotal" />
    </div>
    <div class="basis-1/3">
      <CardStatus title="Jumlah Pasien" :status="patientTotal" />
    </div>
  </div>
</template>
