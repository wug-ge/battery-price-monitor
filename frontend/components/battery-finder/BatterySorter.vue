<template>
  <div class="grid grid-cols-6 justify-between">
    <div class="col-span-2 flex items-center">
      <div class="text-accent-1 font-semibold w-24">Sort by:</div>
      <bpm-select :options="sortOptions" v-model="batteryFilter.sortBy" />
    </div>
    <bpm-switch-button class="col-span-3 w-full relative" v-model="batteryFilter.sortByLowest">
      <template #optionOne>Highest</template>
      <template #optionTwo>Lowest</template>
    </bpm-switch-button>
  </div>
</template>

<script lang="ts" setup>
import type { BatteryFilter } from '~/lib/services/BatteryFilterService';
import type { Option } from '../BpmMultiselect.vue';
import { Battery } from '~/lib/models/Battery';

interface Props {
  batteryFilter: BatteryFilter
}
defineProps<Props>()
 
const batteryStore = useBatteryStore();
const { batteries } = storeToRefs(batteryStore);
const { t } = useI18n()

const sortOptions = computed(() => {
  const options: Option[] = []

  //add all keys of batteries to the options array
  const battery = new Battery() 
    Object.keys(battery).forEach((key) => {
    if (!options.find((option) => option.value === key)) {
      options.push({ name: t(key), value: key, disabled: false })
    }
  })
  return options
})

</script>