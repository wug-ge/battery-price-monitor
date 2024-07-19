<template>
  <div class="container grid grid-cols-6">
    <charts-energy-density-scatter class="col-span-6 md:col-span-3 p-2 m-4 rounded-lg" />
    <charts-watt-hours-by-euro-scatter class="col-span-6 md:col-span-3 p-2 m-4 rounded-lg" />
  </div>
</template>

<script lang="ts" setup>
import { useBatteryStore } from '~/stores/battery';

const batteryStore = useBatteryStore()

const { loadAllBatteries } = batteryStore

onMounted(() => {
  loadAllBatteries()
})
</script>