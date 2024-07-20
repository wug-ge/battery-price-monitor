import { defineStore } from "pinia";
import type { Battery } from "~/lib/models/Battery";
import { filterTop20VolumetricEnergyDensity, filterTop20WhPerEuro, getAllBatteries } from "~/lib/services/BatteryService";

export const useBatteryStore = defineStore('battery', () => {
  const batteries: Ref<Battery[]> = ref([])

  const loadAllBatteries = async () => {
    batteries.value = await getAllBatteries()
  }

  return {
    batteries,

    loadAllBatteries,
  }
})