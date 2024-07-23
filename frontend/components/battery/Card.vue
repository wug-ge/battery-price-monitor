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

        <tr>
          <td class="font-semibold">Min. Capacity:</td>
          <td class="font-light">{{ battery.minCapacity }}mAh</td>
        </tr>

        <tr>
          <td class="font-semibold">Typ. capacity:</td>
          <td class="font-light">{{ battery.typCapacity }}mAh</td>
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
