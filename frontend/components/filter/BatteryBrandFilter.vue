<template>
  <div class="text-accent-1 font-semibold">Brand:</div>
  <bpm-select class="max-w-24" :options="brandOptions" v-model="batteryFilter.brandFilter" />
</template>

<script lang="ts" setup>
import type { BatteryFilter } from '~/lib/services/BatteryFilterService';

interface Props {
  batteryFilter: BatteryFilter
}
defineProps<Props>()

const batteryStore = useBatteryStore()
const { batteries } = storeToRefs(batteryStore)

const brandOptions = computed(() => {
  const options = [{ name: 'all', value: '', disabled: false }] 

  batteries.value.forEach((battery) => {
    if (!options.find((option) => option.value === battery.brand)) {
      options.push({ name: battery.brand, value: battery.brand, disabled: false })
    }
  })

  return options

})
</script>