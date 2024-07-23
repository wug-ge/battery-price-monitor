<template>
  <div class="container">
    <filter-battery-filter />

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <battery-card
        v-for="battery in batteries"
        :key="battery.id"
        :battery="battery"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Battery } from '~/lib/models/Battery';
import { getAllBatteries } from '~/lib/services/BatteryService';

const batteries = ref<Battery[]>([])


const loadBatteries = async() => {
  batteries.value = await getAllBatteries()
}

onMounted(() => {
  loadBatteries()
})

</script>
