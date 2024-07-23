<template>
  <div class="text-accent-1 font-semibold">Size:</div>
  <bpm-select class="max-w-24" :options="sizeOptions" v-model="batteryFilter.sizeFilter" />
</template>

<script lang="ts" setup>
import type { BatteryFilter } from '~/lib/services/BatteryFilterService';

interface Props {
  batteryFilter: BatteryFilter
}
defineProps<Props>()

const batteryStore = useBatteryStore()
const { batteries } = storeToRefs(batteryStore)

const sizeOptions = computed(() => {
  const options = [{ name: 'all', value: '', disabled: false }] 

  batteries.value.forEach((battery) => {
    if (!options.find((option) => option.value === battery.size)) {
      options.push({ name: battery.size, value: battery.size, disabled: false })
    }
  })

  return options

})
</script>