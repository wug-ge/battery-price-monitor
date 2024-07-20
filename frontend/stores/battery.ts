import { defineStore } from "pinia";
import { Battery } from "~/lib/models/Battery";
import { getAllBatteries, getBatteryById } from "~/lib/services/BatteryService";

export const useBatteryStore = defineStore('battery', () => {
  const batteries: Ref<Battery[]> = ref([])
  const currentBattery: Ref<Battery> = ref({...(new Battery())})

  const loadAllBatteries = async () => {
    batteries.value = await getAllBatteries()
  }

  const loadCurrentBattery = async (id: number) => {
    currentBattery.value = await getBatteryById(id)
  }

  return {
    batteries,
    currentBattery,

    loadAllBatteries,
    loadCurrentBattery,
  }
})