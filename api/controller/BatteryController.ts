import { getDataSource } from '../data-source'
import { Battery } from '../models/Battery'

export class BatteryController {
  private batteryRepository = getDataSource().getRepository(Battery)

  async getAllBatteries() {
    return await this.batteryRepository.find()
  }

  async getAllBatteriesByEnergyDensity() {
    const batteries = await this.batteryRepository.find()

    return batteries.sort((a, b) => {
      const energyDensityA = a.typCapacity / a.weight
      const energyDensityB = b.typCapacity / b.weight
      return energyDensityB - energyDensityA
    }).map(battery => {
      return {
        id: battery.id,
        brand: battery.brand,
        model: battery.model,
        energyDensity: battery.typCapacity / battery.weight
      }
    })
  }
}