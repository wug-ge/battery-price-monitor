<template>
  <div class="container">
    <div class="grid grid-cols-6">
      <div class="col-span-6 md:col-span-2 px-4 mt-4">
        <filter-battery-filter :battery-filter="batteryFilter" />
      </div>
      <div class="col-span-6 md:col-span-4 px-4">
        <battery-finder-battery-sorter class="col-span-6" :battery-filter="batteryFilter" />
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <battery-card
            v-for="battery in filteredBatteries"
            :key="battery.id"
            :battery="battery"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  BatteryFilter,
  BatteryFilterService,
} from "~/lib/services/BatteryFilterService";

const batteryFilter = ref<BatteryFilter>(new BatteryFilter());

const batteryStore = useBatteryStore();
const { loadAllBatteries } = batteryStore;
const { batteries } = storeToRefs(batteryStore);

const filteredBatteries = computed(() => {
  const batteryFilterService = new BatteryFilterService(batteryFilter.value);
  return batteryFilterService.filterBatteries(batteries.value);
});

onMounted(() => {
  loadAllBatteries();
});
</script>
