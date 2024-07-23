<template>
  <div class="grid grid-cols-6">
    <filter-battery-size-filter class="col-span-2" :battery-filter="batteryFilter" />
    <filter-battery-brand-filter class="col-span-2" :battery-filter="batteryFilter" />
  </div>
</template>

<script lang="ts" setup>
import type { BatteryFilter } from "~/lib/services/BatteryFilterService";

interface Props {
  batteryFilter: BatteryFilter;
}

defineProps<Props>();
</script>
