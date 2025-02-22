<template>
  <div class="col-span-1 bg-accent-1 rounded-xl p-4 mt-4 text-primary text-sm">
    <div class="flex justify-center">
      <battery-logo class="w-32" />
    </div>

    <div class="font-semibold text-lg">{{ battery.brand }} {{ battery.model }}</div>
    <div class="grid grid-cols-3">
      <div class="flex items-center">
        <Icon name="tabler:dimensions" />{{ battery.size }}
      </div>
      <div class="flex items-center">
        <Icon name="carbon:chemistry" />{{ battery.chemistry }}
      </div>
      <div>
        {{ Math.round(battery.volumetricEnergyDensity) }}Wh/l
      </div>
    </div>

    <div class="grid grid-cols-3">
      <div class="flex items-center">
        <Icon name="material-symbols:weight-outline" />{{ battery.weight }}g
      </div>
      <div class="flex items-center">
        <Icon name="tabler:dimensions" />{{ battery.size }}
      </div>
      <div>
        {{ Math.round(battery.gravimetricEnergyDensity) }}Wh/kg
      </div>
    </div>
    <hr class="mx-1 my-2 opacity-70" />
    <div class="grid grid-cols-3">
      <div class="font-semibold">
        Price/Wh
      </div>
      <div>
        {{ (Math.round(battery.whPerEuro * 100) / 100).toFixed(2) }}Wh/€ 
      </div>
      <div v-if="battery.whPerEuroReduced" class="flex items-center">
        <Icon name="mdi:discount" />{{ (Math.round(battery.whPerEuroReduced * 100) / 100).toFixed(2) }}Wh/€
      </div>
    </div>

    <div class="grid grid-cols-3">
      <div class="font-semibold col-span-2">
        Capacity
      </div>
      <div>
        {{ battery.typCapacity }}mAh
      </div>
    </div>

    <div v-if="battery.dischargeCurrent" class="grid grid-cols-3">
      <div class="font-semibold col-span-2">{{ $t('maxCurrent') }}</div>
      <div>{{ battery.dischargeCurrent }}A</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Battery } from "~/lib/models/Battery";

interface Props {
  battery: Battery;
}

const props = defineProps<Props>();
</script>
