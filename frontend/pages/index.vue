<template>
  <layout-header></layout-header>
  <div class="container grid grid-cols-6">
    <div class="col-span-6 md:col-span-3 p-2 m-4 rounded-lg">
      <charts-energy-density-scatter title="Top 20 Volumetric Energy Density" :filter="filterTop20VolumetricEnergyDensity" />
    </div>
    <div class="col-span-6 md:col-span-3 p-2 m-8 rounded-lg">
      <charts-watt-hours-by-euro-bar title="Top 20 Wh/€" :filter="filterTop20WhPerEuro" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { filterTop20VolumetricEnergyDensity, filterTop20WhPerEuro } from '~/lib/services/BatteryService';
import { useBatteryStore } from '~/stores/battery';

const batteryStore = useBatteryStore()

const { loadAllBatteries } = batteryStore

onMounted(() => {
  loadAllBatteries()
})
</script>