<template>
  <div class="col-span-1 bg-accent-1 rounded-xl p-4 mt-4 text-primary">
    <div class="flex justify-center">
      <battery-logo class="w-32" />
    </div>
    <div class="flex justify-center">
      <table class="w-72">
        <tr>
          <td class="font-semibold">Brand:</td>
          <td class="font-light">{{ battery.brand }}</td>
        </tr>

        <tr>
          <td class="font-semibold">Model:</td>
          <td class="font-light">{{ battery.model }}</td>
        </tr>

        <tr>
          <td class="font-semibold">Weight:</td>
          <td class="font-light">{{ battery.weight }}g</td>
        </tr>

        <tr>
          <td class="font-semibold">Size:</td>
          <td class="font-light">{{ battery.size }}</td>
        </tr>

        <tr>
          <td class="font-semibold">Chemistry:</td>
          <td class="font-light">{{ battery.chemistry }}</td>
        </tr>

        <tr>
          <td class="font-semibold">Voltage:</td>
          <td class="font-light">{{ battery.voltage }}V</td>
        </tr>

        <tr v-if="battery.minCapacity">
          <td class="font-semibold">Min. Capacity:</td>
          <td class="font-light">{{ battery.minCapacity }}mAh</td>
        </tr>

        <tr v-if="battery.typCapacity">
          <td class="font-semibold">Typ. capacity:</td>
          <td class="font-light">{{ battery.typCapacity }}mAh</td>
        </tr>

        <tr v-if="battery.dischargeCurrent">
          <td class="font-semibold">Disarge Current:</td>
          <td class="font-light">{{ battery.dischargeCurrent }}A</td>
        </tr>

        <tr v-if="battery.gravimetricEnergyDensity">
          <td class="font-semibold">Grav. E. Density:</td>
          <td class="font-light">{{ Math.round(battery.gravimetricEnergyDensity * 100) / 100 }}Wh/kg</td>
        </tr>

        <tr v-if="battery.volumetricEnergyDensity">
          <td class="font-semibold">Vol. E. Density:</td>
          <td class="font-light">{{ Math.round(battery.volumetricEnergyDensity * 100) / 100 }}Wh/l</td>
        </tr>

        <tr v-if="battery.whPerEuro">
          <td class="font-semibold">Wh/€:</td>
          <td class="font-light">{{ (Math.round(battery.whPerEuro * 100) / 100).toFixed(2) }}Wh/€</td>
        </tr>

        <tr v-if="battery.whPerEuroReduced">
          <td class="font-semibold">Wh/€ Reduced:</td>
          <td class="font-light">{{ (Math.round(battery.whPerEuroReduced * 100) / 100).toFixed(2) }}Wh/€</td>
        </tr>

        <tr v-if="battery.height">
          <td class="font-semibold">Height:</td>
          <td class="font-light">{{ battery.height }}mm</td>
        </tr>

        <tr v-if="battery.diameter">
          <td class="font-semibold">Diameter:</td>
          <td class="font-light">{{ battery.diameter }}mm</td>
        </tr>

        <tr v-if="battery.circuitProtection">
          <td class="font-semibold">Circuit Protection:</td>
          <td class="font-light">{{ battery.circuitProtection }}</td>
        </tr>
      </table>
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
