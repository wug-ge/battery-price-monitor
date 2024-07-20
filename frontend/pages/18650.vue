<template>
  <h1 class="text-accent-1">
    <size-18650-header />
  </h1>
  <div class="container">
    <div class="grid grid-cols-6">
      <charts-energy-density-scatter :filter="filter18650Batteries" class="col-span-6 md:col-span-3 p-2 m-4 rounded-lg" />
      <charts-watt-hours-by-euro-bar :filter="filter18650Batteries" class="col-span-6 md:col-span-3 p-2 m-4 rounded-lg" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { filter18650Batteries } from '~/lib/services/BatteryService';

</script>