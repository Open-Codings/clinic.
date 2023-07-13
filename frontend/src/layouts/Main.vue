<script setup>
import SideNav from "@/components/sidenav/SideNav.vue";
import TopNav from "@/components/topnav/TopNav.vue";
</script>

<template>
  <main class="min-h-screen h-full bg-gray-100">
    <div class="flex flex-row space-x-10 p-10 h-full">
      <div class="basis-1/5">
        <SideNav title="Clinic." />
      </div>
      <div class="basis-4/5">
        <TopNav title="Dashboard" />
        <div class="pt-10">
          <RouterView />
        </div>
      </div>
    </div>
  </main>
</template>
