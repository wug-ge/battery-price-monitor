<template>
  <div class="container">
    <div class="grid grid-cols-6">
      <div class="col-span-2 bg-accent-1 rounded-xl p-4 mt-4 text-primary">
        <div class="flex justify-center">
          <battery-logo class="w-32" />
        </div>
        <div class="flex justify-center">
          <table class="w-72">
            <tr>
              <td class="font-semibold">Brand:</td>
              <td class="font-light">{{ currentBattery.brand }}</td> 
            </tr>

            <tr>
              <td class="font-semibold">Model:</td>
              <td class="font-light">{{ currentBattery.model }}</td> 
            </tr>

            <tr>
              <td class="font-semibold">Weight:</td>
              <td class="font-light">{{ currentBattery.weight }}g</td> 
            </tr>

            <tr>
              <td class="font-semibold">Size:</td>
              <td class="font-light">{{ currentBattery.size }}</td> 
            </tr>

            <tr>
              <td class="font-semibold">Chemistry:</td>
              <td class="font-light">{{ currentBattery.chemistry }}</td> 
            </tr>

            <tr>
              <td class="font-semibold">Voltage:</td>
              <td class="font-light">{{ currentBattery.voltage }}V</td> 
            </tr>

            <tr>
              <td class="font-semibold">Min. Capacity:</td>
              <td class="font-light">{{ currentBattery.minCapacity }}mAh</td> 
            </tr>

            <tr>
              <td class="font-semibold">Typ. capacity:</td>
              <td class="font-light">{{ currentBattery.typCapacity}}mAh</td> 
            </tr>

          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useBatteryStore } from '~/stores/battery';
const route = useRoute()
const batteryStore = useBatteryStore()

const { loadCurrentBattery }  = batteryStore
const { currentBattery } = storeToRefs(batteryStore)

onMounted(() => {
  loadCurrentBattery(parseInt(route.params.id as string))
})
</script>