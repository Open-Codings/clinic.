<template>
  <div id="card" class="w-full h-full p-5 bg-slate-50 rounded-xl shadow-sm">
    <div class="flex flex-row justify-between">
      <span class="text-xl font-bold font-poppins">
        <slot name="card-title" />
      </span>
      <div>
        <slot name="card-tool" />
      </div>
    </div>
    <div class="mt-5">
      <slot name="card-body" />
    </div>
  </div>
</template>
