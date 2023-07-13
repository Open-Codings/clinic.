<script setup>
import { reactive } from "vue";

import MenuChild from "./MenuChild.vue";

const menuMed = reactive([["List", "medecine"], ["Create", "medecine-create"]]);
const menuPat = reactive([["List", "patient"], ["Preserve", "patient-preserve"]]);
</script>

<template>
  <div id="menu-1" class="my-2 font-poppins">
    <span>Medicine</span>
    <div id="submenu-1">
      <MenuChild :menus="menuMed" />
    </div>
  </div>

  <div id="menu-2" class="my-2 font-poppins">
    <span>Patient</span>
    <div id="submenu-2">
      <MenuChild :menus="menuPat" />
    </div>
  </div>
</template>
